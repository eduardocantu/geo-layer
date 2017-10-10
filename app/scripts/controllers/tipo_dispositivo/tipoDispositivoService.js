'use strict';

angular.module('geoLayerApp')
        .factory('tipoDispositivoService', function ($q, crudService, RESOURCE) {
            var tipoDispositivoService = angular.extend({}, crudService);

            tipoDispositivoService.buscarTipoDispositivo = function (id) {
                var deferred = $q.defer();
                tipoDispositivoService.buscar(RESOURCE.tipoDispositivo.url, id, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            tipoDispositivoService.listarTiposDispositivos = function () {
                var deferred = $q.defer();
                tipoDispositivoService.listar(RESOURCE.tipoDispositivo.url, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            tipoDispositivoService.removerTipoDispositivo = function (tipoDispositivo) {
                var deferred = $q.defer();
                tipoDispositivoService.remover(RESOURCE.tipoDispositivo.url, tipoDispositivo.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            tipoDispositivoService.salvarTipoDispositivo = function (tipoDispositivo) {
                var deferred = $q.defer();
                tipoDispositivoService.salvar(RESOURCE.tipoDispositivo.url, tipoDispositivo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            tipoDispositivoService.editarTipoDispositivo = function (tipoDispositivo) {
                var deferred = $q.defer();
                tipoDispositivoService.editar(RESOURCE.tipoDispositivo.url, tipoDispositivo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return tipoDispositivoService;

        });
