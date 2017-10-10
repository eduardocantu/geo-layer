'use strict';
angular.module('geoLayerApp')
        .factory('authService', ['$http', '$localStorage', 'RESOURCE', '$q', function ($http, $localStorage, RESOURCE, $q) {
                function changeUser(user) {
                    angular.extend(currentUser, user);
                }

                function urlBase64Decode(str) {
                    var output = str.replace('-', '+').replace('_', '/');
                    switch (output.length % 4) {
                        case 0:
                            break;
                        case 2:
                            output += '==';
                            break;
                        case 3:
                            output += '=';
                            break;
                        default:
                            throw 'Cadeia de caracteres base64url inválida!';
                    }
                    return window.atob(output);
                }

                function getUserFromToken() {
                    //var token = $localStorage.token;
                    var user = {};
                    return user;
                }

                var currentUser = getUserFromToken();
                var deferred = $q.defer();
                return {
                    save: function (data, success, error) {
                        $http.post(RESOURCE.auth.url, data).success(success).error(error);
                    },
                    signin: function (data) {
                        $http.post(RESOURCE.auth.url, data).then(function(response){
                            deferred.resolve(response);
                        });
                        return deferred.promise;
                    },
                    me: function (success, error) {
                        $http.get(RESOURCE.auth.url + '/me').success(success).error(error);
                    },
                    logout: function () {
                        $http.get(RESOURCE.logout.url).success(function(){
                            deferred.resolve({
                                logged: false
                            });
                        }).error(function(){
                            deferred.resolve({
                                logged: false
                            });
                        });
                        return deferred.promise;
                    }
                };
            }
        ]);