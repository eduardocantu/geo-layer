'use strict';

angular.module('geoLayerApp')
        .factory('ocorrenciaService', function ($q, crudService, RESOURCE) {
            var ocorrenciaService = angular.extend({}, crudService);

            ocorrenciaService.buscar = function () {
                var deferred = $q.defer();
                ocorrenciaService.listar(RESOURCE.ocorrencia.url + '/usuario', function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return ocorrenciaService;

        });
