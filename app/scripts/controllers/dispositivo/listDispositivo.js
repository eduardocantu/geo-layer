'use strict';

angular.module('geoLayerApp')
        .controller('ListDispositivoCtrl', function ($scope, dispositivoService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.dispositivos = [];
            $scope.dispositivo = {};
            dispositivoService.listarDispositivos().then(function (data) {
                console.log(data.data.rows);
                $scope.dispositivos = data.data.rows;
            });

            $scope.selecionarDispositivo = function (dispositivo) {
                $scope.dispositivo = dispositivo;
            };

            $scope.removerDispositivo = function () {
                var indice;
                dispositivoService.removerDispositivo($scope.dispositivo).then(function (data) {
                    angular.forEach($scope.dispositivos, function (dispositivo, idx) {
                        if (dispositivo.codigo === $scope.dispositivo.codigo) {
                            indice = idx;
                        }
                    });

                    $scope.dispositivos.splice(indice, 1);
                });
            };
        });
