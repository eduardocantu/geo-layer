'use strict';

angular.module('geoLayerApp')
        .controller('ListRegiaoCtrl', function ($scope, regiaoService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.regioes = [];
            $scope.regiao = {};
            regiaoService.listarRegioes().then(function (data) {
                $scope.regioes = data.data.rows;
                console.log($scope.regioes);
            });

            $scope.selecionarRegiao = function (regiao) {
                $scope.regiao = regiao;
            };

            $scope.removerRegiao = function () {
                var indice;
                regiaoService.removerRegiao($scope.regiao).then(function (data) {
                    angular.forEach($scope.regioes, function (regiao, idx) {
                        if (regiao.codigo === $scope.regiao.codigo) {
                            indice = idx;
                        }
                    });

                    $scope.regioes.splice(indice, 1);
                });
            };
        });
