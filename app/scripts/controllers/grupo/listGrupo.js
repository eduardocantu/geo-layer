'use strict';

angular.module('geoLayerApp')
        .controller('ListGrupoCtrl', function ($scope, grupoService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.grupos = [];
            $scope.grupo = {};
            grupoService.listarGrupos().then(function (data) {
                console.log(data.data.rows);
                $scope.grupos = data.data.rows;
            });

            $scope.selecionarGrupo = function (grupo) {
                $scope.grupo = grupo;
            };

            $scope.removerGrupo = function () {
                var indice;
                grupoService.removerGrupo($scope.grupo).then(function (data) {
                    angular.forEach($scope.grupos, function (grupo, idx) {
                        if (grupo.codigo === $scope.grupo.codigo) {
                            indice = idx;
                        }
                    });

                    $scope.grupos.splice(indice, 1);
                });
            };
        });
