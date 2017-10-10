'use strict';

angular.module('geoLayerApp')
        .controller('FormRegiaoCtrl', function ($scope, $routeParams, regiaoService) {

            var inicializar = function () {
                $scope.regiao = {
                    nome: ""
                };
            };

            $scope.isInvalidForm = function () {
                return $scope.formRegiao.$valid;
            };

            $scope.isInvalidField = function (field) {
                return $scope.formRegiao[field].$invalid && $scope.formRegiao[field].$dirty;
            };

            if ($routeParams.codigo) {
                regiaoService.buscarRegiao($routeParams.codigo).then(function (data) {
                    $scope.regiao = data.data.rows[0];
                });
            }

            $scope.salvar = function () {
                regiaoService.salvarRegiao($scope.regiao).then(function (data) {
                    $scope.regiao = {};
                    $scope.limpar();
                });
            };

            $scope.editar = function () {
                regiaoService.editarRegiao($scope.regiao).then(function (data) {
                    $scope.regiao = {};
                    $scope.limpar();
                });
            };

            $scope.limpar = function () {
                $scope.formRegiao.$setPristine();
                inicializar();
            };
            inicializar();
        });
