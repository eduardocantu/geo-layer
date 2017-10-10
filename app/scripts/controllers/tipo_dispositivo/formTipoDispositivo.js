'use strict';

angular.module('geoLayerApp')
        .controller('FormTipoDispositivoCtrl', function ($scope, $routeParams, tipoDispositivoService, categoriaLayerService) {
            var primeiro_codigo_categoria_layer;
            var inicializar = function () {
                $scope.tipoDispositivo = {
                    nome: "",
                    codigo_categoria_layer : primeiro_codigo_categoria_layer
                };
            };

            categoriaLayerService.listarCategoriasLayer().then(function (data) {
                $scope.categoriasLayer = data.data.rows;
                if ($scope.categoriasLayer) {
                    primeiro_codigo_categoria_layer = $scope.categoriasLayer[0].codigo
                }
                if ($routeParams.codigo) {
                    tipoDispositivoService.buscarTipoDispositivo($routeParams.codigo).then(function (data) {
                        $scope.tipoDispositivo = data.data.rows[0];
                    });
                } else {
                    inicializar();
                }
            });

            $scope.isInvalidForm = function () {
                return $scope.formTipoDispositivo.$valid;
            };

            $scope.isInvalidField = function (field) {
                return $scope.formTipoDispositivo[field].$invalid && $scope.formTipoDispositivo[field].$dirty;
            };

            $scope.salvar = function () {
                tipoDispositivoService.salvarTipoDispositivo($scope.tipoDispositivo).then(function (data) {
                    $scope.tipoDispositivo = {};
                    $scope.limpar();
                });
            };

            $scope.editar = function () {
                tipoDispositivoService.editarTipoDispositivo($scope.tipoDispositivo).then(function (data) {
                    $scope.tipoDispositivo = {};
                    $scope.limpar();
                });
            };

            $scope.limpar = function () {
                $scope.formTipoDispositivo.$setPristine();
                inicializar();
            };
        });
