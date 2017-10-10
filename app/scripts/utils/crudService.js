'use strict';

angular.module('geoLayerApp')
        .factory('crudService', function ($http, $localStorage, mensagem) {
            var listar = function (resource, callback, error) {
                $http({method: 'GET', url: resource})
                        .success(function (data) {
                            callback({success: true, data: data});
                        })
                        .error(function (data) {
                            callback({success: false, data: data});
                        });
            };

            var buscar = function (resource, _id, callback) {
                $http({method: 'GET', url: resource.concat('/').concat(_id)})
                        .success(function (data) {
                            callback({success: true, data: data});
                        })
                        .error(function (data) {
                            callback({success: false, data: data});
                        });
            };

            var salvar = function (resource, document, callback) {
                $http({method: 'POST', url: resource, data: document})
                        .success(function (data) {
                            mensagem.success('Registro salvo com sucesso.');
                            callback({success: true, data: data});
                        })
                        .error(function (data) {
                            mensagem.danger('Erro ao salvar registro.');
                            callback({success: false, data: data});
                        });
            };
         
            var editar = function (resource, document, callback) {
                $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                $http({method: 'PUT', url: resource + '/' + document.codigo, data: document})
                        .success(function (data) {
                            mensagem.success('Registro editado com sucesso.');
                            callback({success: true, data: data});
                        })
                        .error(function (data) {
                            mensagem.danger('Erro ao editar registro.');
                            callback({success: false, data: data});
                        });
            };

            var remover = function (resource, _id, callback) {
                $http({method: 'DELETE', url: resource.concat('/').concat(_id)})
                        .success(function (data) {
                            mensagem.success('Registro excluido com sucesso.');
                            callback({success: true, data: data});
                        })
                        .error(function (data) {
                            mensagem.danger('Erro ao excluir registro.');
                            callback({success: false, data: data});
                        });
            };

            return{
                listar: listar,
                buscar: buscar,
                salvar: salvar,
                editar: editar,
                remover: remover
            };
        });
