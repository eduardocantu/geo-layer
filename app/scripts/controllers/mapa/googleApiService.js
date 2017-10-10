
angular.module('geoLayerApp')
        .factory('googleApiService', function ($q, crudService, RESOURCE) {
            var mapaService = angular.extend({}, crudService);

            mapaService.buscarEndereco = function (latlng) {
                var deferred = $q.defer();
                mapaService.listar(RESOURCE.googleapi.latlng.url + latlng, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.buscarLatlng = function (endereco) {
                var deferred = $q.defer();
                mapaService.listar(RESOURCE.googleapi.address.url + endereco, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            return mapaService;

        });
        