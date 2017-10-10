'use strict';
angular.module('geoLayerApp').filter('isVector', function () {
    return function (input) {
        return input instanceof ol.source.Vector;
    };
});