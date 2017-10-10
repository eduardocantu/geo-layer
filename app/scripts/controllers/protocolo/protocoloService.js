'use strict';

angular.module('geoLayerApp')
        .factory('protocoloService', function ($q, crudService, RESOURCE) {
            var protocoloService = angular.extend({}, crudService);

            protocoloService.buscarProtocolo = function (id) {
                var deferred = $q.defer();
                protocoloService.buscar(RESOURCE.protocolo.url, id, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            protocoloService.listarProtocolos = function () {
                var deferred = $q.defer();
                protocoloService.listar(RESOURCE.protocolo.url, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            protocoloService.removerProtocolo = function (protocolo) {
                var deferred = $q.defer();
                protocoloService.remover(RESOURCE.protocolo.url, protocolo.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            protocoloService.salvarProtocolo = function (protocolo) {
                var deferred = $q.defer();
                protocoloService.salvar(RESOURCE.protocolo.url, protocolo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            protocoloService.editarProtocolo = function (protocolo) {
                var deferred = $q.defer();
                protocoloService.editar(RESOURCE.protocolo.url, protocolo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return protocoloService;

        });
