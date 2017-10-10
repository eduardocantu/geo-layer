'use strict';

angular.module('geoLayerApp')
        .controller('FormDispositivoCtrl', function ($scope, $routeParams, dispositivoService, layerService, googleApiService, FORMATOS, CORES, TIPO_LAYER) {
            var primeiro_codigo_layer;

            var inicializar = function () {
                $scope.dispositivo = {
                    nome: "",
                    cor: CORES.AMARELO.valor,
                    tipo: TIPO_LAYER.DISPOSITIVO.valor,
                    formato: FORMATOS.CIRCULO.valor,
                    codigo_layer : primeiro_codigo_layer
                };
            };

            if ($routeParams.codigo) {
                dispositivoService.buscarDispositivo($routeParams.codigo).then(function (data) {
                    $scope.dispositivo = data.data.rows[0];
                });
            }

            layerService.listarLayers().then(function (data) {
                $scope.layers = data.data.rows;
                if ($scope.layers) {
                    primeiro_codigo_layer = $scope.layers[0].codigo
                }
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
                return $scope.formDispositivo.$valid;
            };

            $scope.isInvalidField = function (field) {
                return $scope.formDispositivo[field].$invalid && $scope.formDispositivo[field].$dirty;
            };

            $scope.salvar = function () {
                googleApiService.buscarLatlng($scope.dispositivo.endereco).then(function (data) {
                    try {
                        if (data.success) {
                            var lat = data.data.results[0].geometry.location.lat;
                            var lng = data.data.results[0].geometry.location.lng;
                            $scope.dispositivo.coordenada = lat + "," + lng;
                            dispositivoService.salvarDispositivo($scope.dispositivo).then(function (data) {
                                $scope.dispositivo = {};
                                $scope.limpar();
                            });
                        }
                    } catch (err) {
                        console.log(err);
                    } 
                });
            };

            $scope.editar = function () {
                dispositivoService.editarDispositivo($scope.dispositivo).then(function (data) {
                    $scope.dispositivo = {};
                    $scope.limpar();
                });
            };

            $scope.limpar = function () {
                $scope.formDispositivo.$setPristine();
                inicializar();
            };
        });
