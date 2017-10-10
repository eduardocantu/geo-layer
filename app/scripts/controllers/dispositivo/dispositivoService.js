'use strict';

angular.module('geoLayerApp')
        .factory('dispositivoService', function ($q, crudService, RESOURCE) {
            var dispositivoService = angular.extend({}, crudService);

            dispositivoService.buscarDispositivo = function (id) {
                var deferred = $q.defer();
                dispositivoService.buscar(RESOURCE.dispositivo.url, id, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            dispositivoService.listarDispositivos = function () {
                var deferred = $q.defer();
                dispositivoService.listar(RESOURCE.dispositivo.url, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            dispositivoService.removerDispositivo = function (dispositivo) {
                var deferred = $q.defer();
                dispositivoService.remover(RESOURCE.dispositivo.url, dispositivo.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            dispositivoService.salvarDispositivo = function (dispositivo) {
                var deferred = $q.defer();
                dispositivoService.salvar(RESOURCE.dispositivo.url, dispositivo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            dispositivoService.editarDispositivo = function (dispositivo) {
                var deferred = $q.defer();
                dispositivoService.editar(RESOURCE.dispositivo.url, dispositivo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return dispositivoService;

        });
