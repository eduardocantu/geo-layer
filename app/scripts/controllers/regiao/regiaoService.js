'use strict';

angular.module('geoLayerApp')
        .factory('regiaoService', function ($q, crudService, RESOURCE) {
            var regiaoService = angular.extend({}, crudService);

            regiaoService.buscarRegiao = function (id) {
                var deferred = $q.defer();
                regiaoService.buscar(RESOURCE.regiao.url, id, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            regiaoService.listarRegioes = function () {
                var deferred = $q.defer();
                regiaoService.listar(RESOURCE.regiao.url, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            regiaoService.removerRegiao = function (regiao) {
                var deferred = $q.defer();
                regiaoService.remover(RESOURCE.regiao.url, regiao.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            regiaoService.salvarRegiao = function (regiao) {
                var deferred = $q.defer();
                regiaoService.salvar(RESOURCE.regiao.url, regiao, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            regiaoService.editarRegiao = function (regiao) {
                var deferred = $q.defer();
                regiaoService.editar(RESOURCE.regiao.url, regiao, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return regiaoService;

        });
