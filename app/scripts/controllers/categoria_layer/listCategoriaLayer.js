'use strict';

angular.module('geoLayerApp')
        .controller('ListCategoriaLayerCtrl', function ($scope, categoriaLayerService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.categoriasLayer = [];
            $scope.categoriaLayer = {};
            categoriaLayerService.listarCategoriasLayer().then(function (data) {
                $scope.categoriasLayer = data.data.rows;
                console.log($scope.categoriasLayer);
            });

            $scope.selecionarCategoriaLayer = function (categoriaLayer) {
                $scope.categoriaLayer = categoriaLayer;
            };

            $scope.removerCategoriaLayer = function () {
                var indice;
                categoriaLayerService.removerCategoriaLayer($scope.categoriaLayer).then(function (data) {
                    angular.forEach($scope.categoriasLayer, function (categoriaLayer, idx) {
                        if (categoriaLayer.codigo === $scope.categoriaLayer.codigo) {
                            indice = idx;
                        }
                    });

                    $scope.categoriasLayer.splice(indice, 1);
                });
            };
        });
