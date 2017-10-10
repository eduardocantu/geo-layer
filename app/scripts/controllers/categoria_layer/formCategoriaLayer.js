'use strict';

angular.module('geoLayerApp')
        .controller('FormCategoriaLayerCtrl', function ($scope, $routeParams, categoriaLayerService) {

            var inicializar = function () {
                $scope.categoriaLayer = {
                    nome: ""
                };
            };

            $scope.isInvalidForm = function () {
                return $scope.formCategoriaLayer.$valid;
            };

            $scope.isInvalidField = function (field) {
                return $scope.formCategoriaLayer[field].$invalid && $scope.formCategoriaLayer[field].$dirty;
            };

            if ($routeParams.codigo) {
                categoriaLayerService.buscarCategoriaLayer($routeParams.codigo).then(function (data) {
                    $scope.categoriaLayer = data.data.rows[0];
                });
            }

            $scope.salvar = function () {
                categoriaLayerService.salvarCategoriaLayer($scope.categoriaLayer).then(function (data) {
                    $scope.categoriaLayer = {};
                    $scope.limpar();
                });
            };

            $scope.editar = function () {
                categoriaLayerService.editarCategoriaLayer($scope.categoriaLayer).then(function (data) {
                    $scope.categoriaLayer = {};
                    $scope.limpar();
                });
            };

            $scope.limpar = function () {
                $scope.formCategoriaLayer.$setPristine();
                inicializar();
            };
            inicializar();
        });
