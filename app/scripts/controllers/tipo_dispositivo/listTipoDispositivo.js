'use strict';

angular.module('geoLayerApp')
        .controller('ListTipoDispositivoCtrl', function ($scope, tipoDispositivoService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.tiposDispositivos = [];
            $scope.tipoDispositivo = {};
            tipoDispositivoService.listarTiposDispositivos().then(function (data) {
                $scope.tiposDispositivos = data.data.rows;
                console.log($scope.tiposDispositivos);
            });

            $scope.selecionarTipoDispositivo = function (tipoDispositivo) {
                $scope.tipoDispositivo = tipoDispositivo;
            };

            $scope.removerTipoDispositivo = function () {
                var indice;
                tipoDispositivoService.removerTipoDispositivo($scope.tipoDispositivo).then(function (data) {
                    angular.forEach($scope.tiposDispositivos, function (tipoDispositivo, idx) {
                        if (tipoDispositivo.codigo === $scope.tipoDispositivo.codigo) {
                            indice = idx;
                        }
                    });

                    $scope.tiposDispositivos.splice(indice, 1);
                });
            };
        });
