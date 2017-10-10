'use strict';

/**
 * @ngdoc function
 * @name geoLayerApp.controller:ProtocoloCtrl
 * @description
 * # AboutCtrl
 * Controller of the geoLayerApp
 */
angular.module('geoLayerApp')
        .controller('ListProtocoloCtrl', function ($scope, protocoloService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.protocolos = [];
            $scope.protocolo = {};
            protocoloService.listarProtocolos().then(function (data) {
                $scope.protocolos = data.data.rows;
            });

            $scope.selecionarProtocolo = function (protocolo) {
                $scope.protocolo = protocolo;
            };

            $scope.removerProtocolo = function () {
                var indice;
                protocoloService.removerProtocolo($scope.protocolo).then(function (data) {
                    angular.forEach($scope.protocolos, function (protocolo, idx) {
                        if (protocolo.codigo === $scope.protocolo.codigo) {
                            indice = idx;
                        }
                    });

                    $scope.protocolos.splice(indice, 1);
                });
            };
        });
