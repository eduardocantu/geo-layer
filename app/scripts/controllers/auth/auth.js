'use strict';

angular.module('geoLayerApp')
        .controller('AuthCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'authService', '$route', 'PERMISSAO',
            function ($rootScope, $scope, $location, $localStorage, authService, $route, PERMISSAO) {
                $rootScope.permissoes = [];    
                angular.forEach(PERMISSAO, function(permissao){
                    $rootScope.permissoes.push(permissao);
                });

                $scope.isInvalidField = function (field) {
                    return $scope.formLogin[field].$invalid && $scope.formLogin[field].$dirty;
                };

                $scope.signin = function () {
                    var formData = {
                        email: $scope.email,
                        senha: $scope.senha
                    };           

                    authService.signin(formData).then(function(response) {
                        if (response.statusText === 'OK') {
                            $location.path("/mapa");
                            $localStorage.token = true;
                            $localStorage.permissao = response.data;
                            $rootScope.permissao = response.data;
                            $rootScope.token = true;
                        }
                    });
                };

                $scope.signup = function () {
                    var formData = {
                        email: $scope.email,
                        senha: $scope.senha
                    };

                    authService.save(formData, function (res) {
                        if (res.type == false) {
                            alert(res.data);
                        } else {
                            $localStorage.token = res.data.token;
                            $location.path("/mapa");
                        }
                        ;
                    }, function () {
                        $rootScope.error = 'Falha ao registrar-se';
                    });
                };

                $scope.me = function () {
                    authService.me(function (res) {
                        $scope.myDetails = res;
                    }, function () {
                        $rootScope.error = 'Falha ao buscar os dados';
                    });
                };

                $scope.logout = function () {
                        authService.logout().then(function(){
                            delete $localStorage.token;
                            delete $localStorage.permissoes;
                            $rootScope.token = undefined;
                            $rootScope.permissao = undefined;
                            $location.path("/signin");
                        });
                    }, function () {
                        alert("Falha ao sair!");
                };

                $rootScope.token = $localStorage.token;
            }]);