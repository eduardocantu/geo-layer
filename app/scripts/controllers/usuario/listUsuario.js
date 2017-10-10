'use strict';

/**
 * @ngdoc function
 * @name geoLayerApp.controller:UsuarioCtrl
 * @description
 * # AboutCtrl
 * Controller of the geoLayerApp
 */
angular.module('geoLayerApp')
        .controller('ListUsuarioCtrl', function ($scope, usuarioService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.usuarios = [];
            $scope.usuario = {};

            usuarioService.listarUsuarios().then(function (data) {
                $scope.usuarios = data.data.rows;
            });

            $scope.selecionarUsuario = function (usuario) {
                $scope.usuario = usuario;
            };

            $scope.removerUsuario = function () {
                var indice;
                usuarioService.removerUsuario($scope.usuario).then(function (data) {
                    angular.forEach($scope.usuarios, function (usuario, idx) {
                        if (usuario.codigo === $scope.usuario.codigo) {
                            indice = idx;
                        }
                    });

                    $scope.usuarios.splice(indice, 1);
                });
            };
        });
