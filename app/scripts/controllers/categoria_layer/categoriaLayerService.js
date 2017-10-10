'use strict';

angular.module('geoLayerApp')
        .factory('categoriaLayerService', function ($q, crudService, RESOURCE) {
            var categoriaLayerService = angular.extend({}, crudService);

            categoriaLayerService.buscarCategoriaLayer = function (id) {
                var deferred = $q.defer();
                categoriaLayerService.buscar(RESOURCE.categoriaLayer.url, id, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            categoriaLayerService.listarCategoriasLayer = function () {
                var deferred = $q.defer();
                categoriaLayerService.listar(RESOURCE.categoriaLayer.url, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            categoriaLayerService.removerCategoriaLayer = function (categoriaLayer) {
                var deferred = $q.defer();
                categoriaLayerService.remover(RESOURCE.categoriaLayer.url, categoriaLayer.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            categoriaLayerService.salvarCategoriaLayer = function (categoriaLayer) {
                var deferred = $q.defer();
                categoriaLayerService.salvar(RESOURCE.categoriaLayer.url, categoriaLayer, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            categoriaLayerService.editarCategoriaLayer = function (categoriaLayer) {
                var deferred = $q.defer();
                categoriaLayerService.editar(RESOURCE.categoriaLayer.url, categoriaLayer, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return categoriaLayerService;

        });
