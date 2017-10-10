'use strict';

angular.module('geoLayerApp')
        .factory('gameficationService', function ($q, crudService, RESOURCE) {
            var gameficationService = angular.extend({}, crudService);

            gameficationService.total = function () {
                var deferred = $q.defer();
                gameficationService.listar(RESOURCE.gamefication.url + '/total', function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };


            gameficationService.ranking = function () {
                var deferred = $q.defer();
                gameficationService.listar(RESOURCE.gamefication.url + '/ranking', function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return gameficationService;

        });
