'use strict';

/**
 * @ngdoc function
 * @name geoLayerApp.controller:MunicipioCtrl
 * @description
 * # AboutCtrl
 * Controller of the geoLayerApp
 */
angular.module('geoLayerApp')
        .controller('ListMunicipioCtrl', function ($scope, municipioService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.municipios = [];
            $scope.municipio = {};
            municipioService.listarMunicipios().then(function (data) {
                $scope.municipios = data.data.rows;
            });

            $scope.selecionarMunicipio = function (municipio) {
                $scope.municipio = municipio;
            };

            $scope.removerMunicipio = function () {
                var indice;
                municipioService.removerMunicipio($scope.municipio).then(function (data) {
                    angular.forEach($scope.municipios, function (municipio, idx) {
                        if (municipio.codigo === $scope.municipio.codigo) {
                            indice = idx;
                        }
                    });

                    $scope.municipios.splice(indice, 1);
                });
            };
        });
