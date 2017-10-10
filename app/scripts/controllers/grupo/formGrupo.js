'use strict';

angular.module('geoLayerApp')
        .controller('FormGrupoCtrl', function ($scope, $routeParams, grupoService, regiaoService) {

            regiaoService.listarRegioes().then(function (data) {
                $scope.regioes = data.data.rows;
            });


            var inicializar = function () {
                $scope.grupo = {
                    nome: ""
                };
            };

            $scope.isInvalidForm = function () {
                return $scope.formGrupo.$valid;
            };

            $scope.isInvalidField = function (field) {
                return $scope.formGrupo[field].$invalid && $scope.formGrupo[field].$dirty;
            };

            if ($routeParams.codigo) {
                grupoService.buscarGrupo($routeParams.codigo).then(function (data) {
                    $scope.grupo = data.data.rows[0];
                });
            }

            $scope.salvar = function () {
                grupoService.salvarGrupo($scope.grupo).then(function (data) {
                    $scope.grupo = {};
                    $scope.limpar();
                });
            };

            $scope.editar = function () {
                grupoService.editarGrupo($scope.grupo).then(function (data) {
                    $scope.grupo = {};
                    $scope.limpar();
                });
            };

            $scope.limpar = function () {
                $scope.formGrupo.$setPristine();
                inicializar();
            };
            inicializar();
        });
