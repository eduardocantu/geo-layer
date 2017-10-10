'use strict';

angular.module('geoLayerApp')
        .controller('OcorrenciaCtrl', function ($scope, ocorrenciaService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.ocorrencias = [];
            ocorrenciaService.buscar().then(function (data) {
                $scope.ocorrencias = data.data.rows;
            });
        });
