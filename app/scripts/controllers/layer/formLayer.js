'use strict';

angular.module('geoLayerApp')
        .controller('FormLayerCtrl', function ($scope, $routeParams, categoriaLayerService, layerService, grupoService, FORMATOS, CORES, TIPO_LAYER) {
            var primeiro_codigo_categoria_layer, primeiro_codigo_grupo;

            var inicializar = function () {
                $scope.layer = {
                    nome: "",
                    cor: CORES.AMARELO.valor,
                    tipo: TIPO_LAYER.DISPOSITIVO.valor,
                    formato: FORMATOS.CIRCULO.valor,
                    codigo_categoria_layer : primeiro_codigo_categoria_layer,
                    codigo_grupo : primeiro_codigo_grupo
                };
            };

            categoriaLayerService.listarCategoriasLayer().then(function (data) {
                $scope.categoriasLayer = data.data.rows;
                if ($scope.categoriasLayer) {
                    primeiro_codigo_categoria_layer = $scope.categoriasLayer[0].codigo
                }


                grupoService.listarGrupos().then(function (data) {
                    $scope.grupos = data.data.rows;
                    if ($scope.grupos) {
                        primeiro_codigo_grupo = $scope.grupos[0].codigo
                    }

                    if ($routeParams.codigo) {
                        layerService.buscarLayer($routeParams.codigo).then(function (data) {
                            $scope.layer = data.data.rows[0];
                        });
                    } else {
                        inicializar();
                    }

                });
            });


            $scope.formatos = [];
            angular.forEach(FORMATOS, function(formato){
                $scope.formatos.push(formato);
            });
            
            $scope.cores = [];
            angular.forEach(CORES, function(cor){
                $scope.cores.push(cor);
            });

            $scope.tipos = [];
            angular.forEach(TIPO_LAYER, function(tipo){
                $scope.tipos.push(tipo);
            });

            $scope.isInvalidForm = function () {
                return $scope.formLayer.$valid;
            };

            $scope.isInvalidField = function (field) {
                return $scope.formLayer[field].$invalid && $scope.formLayer[field].$dirty;
            };

            $scope.salvar = function () {
                layerService.salvarLayer($scope.layer).then(function (data) {
                    $scope.layer = {};
                    $scope.limpar();
                });
            };

            $scope.editar = function () {
                layerService.editarLayer($scope.layer).then(function (data) {
                    $scope.layer = {};
                    $scope.limpar();
                });
            };

            $scope.limpar = function () {
                $scope.formLayer.$setPristine();
                inicializar();
            };
        });
