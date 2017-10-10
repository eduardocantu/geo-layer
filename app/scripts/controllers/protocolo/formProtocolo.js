'use strict';

/**
 * @ngdoc function
 * @name geoLayerApp.controller:ProtocoloCtrl
 * @description
 * # AboutCtrl
 * Controller of the geoLayerApp
 */
angular.module('geoLayerApp')
        .controller('FormProtocoloCtrl', function ($scope, $routeParams, protocoloService) {

            var inicializar = function () {
                $scope.protocolo = {
                    nome: "",
                    descricao: ""
                };
            };

            $scope.isInvalidForm = function () {
                return $scope.formProtocolo.$valid;
            };

            $scope.isInvalidField = function (field) {
                return $scope.formProtocolo[field].$invalid && $scope.formProtocolo[field].$dirty;
            };

            if ($routeParams.codigo) {
                protocoloService.buscarProtocolo($routeParams.codigo).then(function (data) {
                    $scope.protocolo = data.data.rows[0];
                });
            }

            $scope.salvar = function () {
                protocoloService.salvarProtocolo($scope.protocolo).then(function (data) {
                    $scope.protocolo = {};
                    $scope.limpar();
                });
            };

            $scope.editar = function () {
                protocoloService.editarProtocolo($scope.protocolo).then(function (data) {
                    $scope.protocolo = {};
                    $scope.limpar();
                });
            };

            $scope.limpar = function () {
                $scope.formProtocolo.$setPristine();
                inicializar();
            };
            inicializar();
        });
