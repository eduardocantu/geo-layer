'use strict';

angular.module('geoLayerApp')
        .factory('layerService', function ($q, crudService, RESOURCE) {
            var layerService = angular.extend({}, crudService);

            layerService.buscarLayer = function (id) {
                var deferred = $q.defer();
                layerService.buscar(RESOURCE.layer.url, id, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            layerService.listarLayers = function () {
                var deferred = $q.defer();
                layerService.listar(RESOURCE.layer.url, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            layerService.removerLayer = function (layer) {
                var deferred = $q.defer();
                layerService.remover(RESOURCE.layer.url, layer.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            layerService.salvarLayer = function (layer) {
                var deferred = $q.defer();
                layerService.salvar(RESOURCE.layer.url, layer, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            layerService.editarLayer = function (layer) {
                var deferred = $q.defer();
                layerService.editar(RESOURCE.layer.url, layer, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return layerService;

        });
