'use strict';

angular.module('geoLayerApp')
        .factory('grupoService', function ($q, crudService, RESOURCE) {
            var grupoService = angular.extend({}, crudService);

            grupoService.buscarGrupo = function (id) {
                var deferred = $q.defer();
                grupoService.buscar(RESOURCE.grupo.url, id, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            grupoService.listarGrupos = function () {
                var deferred = $q.defer();
                grupoService.listar(RESOURCE.grupo.url, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            grupoService.removerGrupo = function (grupo) {
                var deferred = $q.defer();
                grupoService.remover(RESOURCE.grupo.url, grupo.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            grupoService.salvarGrupo = function (grupo) {
                var deferred = $q.defer();
                grupoService.salvar(RESOURCE.grupo.url, grupo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            grupoService.editarGrupo = function (grupo) {
                var deferred = $q.defer();
                grupoService.editar(RESOURCE.grupo.url, grupo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return grupoService;

        });
