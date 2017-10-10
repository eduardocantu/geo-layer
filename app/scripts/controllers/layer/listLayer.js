'use strict';

angular.module('geoLayerApp')
        .controller('ListLayerCtrl', function ($scope, layerService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.layers = [];
            $scope.layer = {};
            layerService.listarLayers().then(function (data) {
                console.log(data.data.rows);
                $scope.layers = data.data.rows;
            });

            $scope.selecionarLayer = function (layer) {
                $scope.layer = layer;
            };

            $scope.removerLayer = function () {
                var indice;
                layerService.removerLayer($scope.layer).then(function (data) {
                    angular.forEach($scope.layers, function (layer, idx) {
                        if (layer.codigo === $scope.layer.codigo) {
                            indice = idx;
                        }
                    });

                    $scope.layers.splice(indice, 1);
                });
            };
        });
