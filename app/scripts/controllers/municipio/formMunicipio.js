'use strict';

/**
 * @ngdoc function
 * @name geoLayerApp.controller:MunicipioCtrl
 * @description
 * # AboutCtrl
 * Controller of the geoLayerApp
 */
angular.module('geoLayerApp')
        .controller('FormMunicipioCtrl', function ($scope, $routeParams, municipioService, regiaoService) {

            regiaoService.listarRegioes().then(function (data) {
                $scope.regioes = data.data.rows;
            });


            var inicializar = function () {
                $scope.municipio = {
                    nome: ""
                };
            };

            $scope.isInvalidForm = function () {
                return $scope.formMunicipio.$valid;
            };

            $scope.isInvalidField = function (field) {
                return $scope.formMunicipio[field].$invalid && $scope.formMunicipio[field].$dirty;
            };

            if ($routeParams.codigo) {
                municipioService.buscarMunicipio($routeParams.codigo).then(function (data) {
                    $scope.municipio = data.data.rows[0];
                });
            }

            $scope.salvar = function () {
                municipioService.salvarMunicipio($scope.municipio).then(function (data) {
                    $scope.municipio = {};
                    $scope.limpar();
                });
            };

            $scope.editar = function () {
                municipioService.editarMunicipio($scope.municipio).then(function (data) {
                    $scope.municipio = {};
                    $scope.limpar();
                });
            };

            $scope.limpar = function () {
                $scope.formMunicipio.$setPristine();
                inicializar();
            };
            inicializar();
        });
