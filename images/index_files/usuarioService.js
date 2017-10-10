'use strict';

angular.module('geoLayerApp')
        .factory('usuarioService', function ($q, crudService, RESOURCE) {
            var usuarioService = angular.extend({}, crudService);
            usuarioService.listarUsuarios = function () {
                var deferred = $q.defer();
                usuarioService.listar(RESOURCE.usuario.mock, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };
            return usuarioService;

        });
