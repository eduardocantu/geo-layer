'use strict';

/**
 * @ngdoc function
 * @name geoLayerApp.controller:UsuarioCtrl
 * @description
 * # AboutCtrl
 * Controller of the geoLayerApp
 */
angular.module('geoLayerApp')
        .controller('FormUsuarioCtrl', function ($scope, mensagem) {
            $scope.adicionar = function () {
                mensagem.success('Usuário adicionado com sucesso!');
            };
        });
