'use strict';

angular.module('geoLayerApp')
        .factory('municipioService', function ($q, crudService, RESOURCE) {
            var municipioService = angular.extend({}, crudService);

            municipioService.buscarMunicipio = function (id) {
                var deferred = $q.defer();
                municipioService.buscar(RESOURCE.municipio.url, id, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            municipioService.listarMunicipios = function () {
                var deferred = $q.defer();
                municipioService.listar(RESOURCE.municipio.url, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            municipioService.removerMunicipio = function (municipio) {
                var deferred = $q.defer();
                municipioService.remover(RESOURCE.municipio.url, municipio.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            municipioService.salvarMunicipio = function (municipio) {
                var deferred = $q.defer();
                municipioService.salvar(RESOURCE.municipio.url, municipio, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            municipioService.editarMunicipio = function (municipio) {
                var deferred = $q.defer();
                municipioService.editar(RESOURCE.municipio.url, municipio, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return municipioService;

        });
