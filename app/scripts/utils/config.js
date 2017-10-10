'use strict';
angular.module('geoLayerApp')
        .config(['$httpProvider', function ($httpProvider) {
                var interceptor = [
                    '$q', '$location', '$localStorage', '$rootScope',
                    function ($q, $location, $localStorage, $rootScope) {
                        var service = {
                            'responseError': function (response) {
                                if (response.status === 401 || response.status === 403) {
                                    response.logged = false;
                                    $localStorage.token = false;
                                    $rootScope.token = false;
                                    $location.path("/signin");
                                } 
                                return $q.reject(response);
                            },
                        };
                        return service;
                    }
                ];
                $httpProvider.interceptors.push(interceptor);
            }]);