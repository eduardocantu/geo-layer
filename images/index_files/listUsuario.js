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
            $scope.usuarios = [];
            $scope.selecionados = [];

            usuarioService.listarUsuarios().then(function (data) {
                $scope.usuarios = data.data;
                console.log(data.data);
            });

        });
