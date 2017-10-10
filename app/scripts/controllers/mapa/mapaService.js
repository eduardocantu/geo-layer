
angular.module('geoLayerApp')
        .factory('mapaService', function ($q, crudService, RESOURCE, STATUS_OCORRENCIA) {
            var mapaService = angular.extend({}, crudService);
//TODO carregar o id do usuario lagado aqui
            mapaService.listarGrupos = function () {
                var deferred = $q.defer();
                mapaService.listar(RESOURCE.grupo.url, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.listarLayers = function (grupo) {
                var deferred = $q.defer();
                mapaService.listar(RESOURCE.layer.url + '/grupo/' + grupo.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.removerGrupo = function (grupo) {
                var deferred = $q.defer();
                mapaService.remover(RESOURCE.grupo.url, grupo.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.removerLayer = function (layer) {
                var deferred = $q.defer();
                mapaService.remover(RESOURCE.layer.url, layer.codigo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.salvarGrupo = function (grupo) {
                var deferred = $q.defer();
                mapaService.salvar(RESOURCE.grupo.url, grupo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.salvarLayer = function (layer) {
                var deferred = $q.defer();
                mapaService.salvar(RESOURCE.layer.url, layer, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.editarGrupo = function (grupo) {
                var deferred = $q.defer();
                mapaService.editar(RESOURCE.grupo.url, grupo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.editarLayer = function (layer) {
                var deferred = $q.defer();
                mapaService.editar(RESOURCE.layer.url, layer, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.listarPontos = function (layer, dataInicial, dataFinal) {
                var deferred = $q.defer();
                var data_inicio = dataInicial.getFullYear() + "-" + (dataInicial.getMonth() + 1) + "-" + dataInicial.getDate();
                var data_fim = dataFinal.getFullYear() + "-" + (dataFinal.getMonth() + 1) + "-" + dataFinal.getDate();
                mapaService.listar(RESOURCE.ponto.url + '/layer/' + layer.codigo + '?data_inicio=' + data_inicio + '&data_fim=' + data_fim,
                    function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.salvarPonto = function (ponto) {
                var deferred = $q.defer();
                mapaService.salvar(RESOURCE.ponto.url, ponto, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.aprovarPonto = function (ponto) {
                var deferred = $q.defer();
                mapaService.editar(RESOURCE.ocorrencia.url + '/aprovado', ponto, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.rejeitarPonto = function (ponto) {
                var deferred = $q.defer();
                mapaService.editar(RESOURCE.ocorrencia.url + '/rejeitado', ponto, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.editarPonto = function (ponto) {
                var deferred = $q.defer();
                mapaService.editar(RESOURCE.ponto.url, ponto, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.salvarDispositivo = function (dispositivo) {
                var deferred = $q.defer();
                mapaService.salvar(RESOURCE.dispositivo.url + '/layer/' + dispositivo.codigo_layer, dispositivo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            mapaService.editarDispositivo = function (dispositivo) {
                var deferred = $q.defer();
                mapaService.editar(RESOURCE.dispositivo.url, dispositivo, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };      

            mapaService.listarDispositivos = function (layer, dataInicial, dataFinal) {
                var deferred = $q.defer();
                var data_inicio = dataInicial.getFullYear() + "-" + (dataInicial.getMonth() + 1) + "-" + dataInicial.getDate();
                var data_fim = dataFinal.getFullYear() + "-" + (dataFinal.getMonth() + 1) + "-" + dataFinal.getDate();
                mapaService.listar(RESOURCE.dispositivo.url + '/layer/' + layer.codigo + '?data_inicio=' + data_inicio + '&data_fim=' + data_fim, function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };                  

            return mapaService;

        });
        