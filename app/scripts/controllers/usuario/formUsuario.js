'use strict';

/**
 * @ngdoc function
 * @name geoLayerApp.controller:UsuarioCtrl
 * @description
 * # AboutCtrl
 * Controller of the geoLayerApp
 */
angular.module('geoLayerApp')
        .controller('FormUsuarioCtrl', function ($scope, $routeParams, usuarioService, municipioService, PERMISSAO) {
            $scope.permissoes = [];

            angular.forEach(PERMISSAO, function(permissao){
                $scope.permissoes.push(permissao);
            });

            $scope.municipios = [];
            var inicializar = function () {
                $scope.usuario = {};
                municipioService.listarMunicipios().then(function(data){
                    $scope.municipios = data.data.rows;
                    if ($scope.permissoes.length > 0)
                        $scope.usuario.tipo = $scope.permissoes[0].valor;
                    if (data.data.rows.length > 0)
                        $scope.usuario.municipio = data.data.rows[0].codigo;
                    if ($routeParams.codigo) {
                        usuarioService.buscarUsuario($routeParams.codigo).then(function (data) {
                            $scope.usuario = data.data.rows[0];
                        });
                    } 
                
                });
            };

            $scope.isInvalidForm = function () {
                return $scope.formUsuario.$valid;
            };

            $scope.isInvalidField = function (field) {
                return $scope.formUsuario[field].$invalid && $scope.formUsuario[field].$dirty;
            };

            $scope.salvar = function () {
                usuarioService.salvarUsuario($scope.usuario).then(function (data) {
                    $scope.usuario = {};
                    $scope.limpar();
                });
            };

            $scope.editar = function () {
                usuarioService.editarUsuario($scope.usuario).then(function (data) {
                    $scope.usuario = {};
                    $scope.limpar();
                });
            };

            $scope.limpar = function () {
                $scope.formUsuario.$setPristine();
            };
            inicializar();
        });
