'use strict';

angular.module('geoLayerApp')
        .factory('usuarioService', function ($q, crudService, RESOURCE) {
            var usuarioService = angular.extend({}, crudService);

            usuarioService.buscarUsuario = function (id) {
                var deferred = $q.defer();
                usuarioService.buscar(RESOURCE.usuario.url, id, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            usuarioService.listarUsuarios = function () {
                var deferred = $q.defer();
                usuarioService.listar(RESOURCE.usuario.url, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            usuarioService.removerUsuario = function (usuario) {
                var deferred = $q.defer();
                usuarioService.remover(RESOURCE.usuario.url, usuario.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            usuarioService.salvarUsuario = function (usuario) {
                var deferred = $q.defer();
                usuarioService.salvar(RESOURCE.usuario.url, usuario, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            usuarioService.editarUsuario = function (usuario) {
                var deferred = $q.defer();
                usuarioService.editar(RESOURCE.usuario.url, usuario, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return usuarioService;

        });
