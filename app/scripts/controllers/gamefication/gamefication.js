'use strict';

angular.module('geoLayerApp')
        .controller('GameficationCtrl', function ($scope, gameficationService) {
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            $scope.lista = [];
            gameficationService.ranking().then(function (data) {
                $scope.lista = data.data.rows;
            });

        });
