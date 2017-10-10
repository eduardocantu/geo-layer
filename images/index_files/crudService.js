'use strict';

angular.module('geoLayerApp')
        .factory('crudService', function ($http) {

            var listar = function (resource, callback) {
                $http({method: 'GET', url: resource})
                        .success(function (data) {
                            callback({success: true, data: data});
                        })
                        .error(function (data) {
                            callback({success: false, data: data});
                        });
            };

            var buscar = function (resource, _id, callback) {

                $http({method: 'GET', url: resource.concat(_id)})
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
                            callback({success: true, data: data});
                        })
                        .error(function (data) {
                            callback({success: false, data: data});
                        });
            };

            var editar = function (resource, document, callback) {
                $http({method: 'PUT', url: resource, data: document})
                        .success(function (data) {
                            callback({success: true, data: data});
                        })
                        .error(function (data) {
                            callback({success: false, data: data});
                        });
            };

            var remover = function (resource, _id, callback) {
                $http({method: 'GET', url: resource.concat(_id)})
                        .success(function (data) {
                            callback({success: true, data: data});
                        })
                        .error(function (data) {
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
