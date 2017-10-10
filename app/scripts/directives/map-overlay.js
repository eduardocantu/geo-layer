'use strict';
angular.module('geoLayerApp')
        .directive('mapOverlay', function () {
            return {
                restrict: 'E',
                scope: {},
                require: "^mapMain",
                replace: true,
                template: '<div id="popup" class="ol-popup" style="width:300px">' +
                        '<a href="" id="popup-closer" class="ol-popup-closer" ng-click="close()"></a>' +
                        '<div id="popup-content">' +
                        '<input type="text" class="form-control" placeholder="Preencha os dados da ocorrência">' +
                        '<hr>' +
                        '<a class="btn btn-default" ng-click="adicionarCoordenada()">Adicionar</a>' +
                        '</div>' +
                        '</div>',
                link: function (scope, element, attrs, ctrl) {
                    var coordinate;
                    var container = document.getElementById('popup');
                    scope.adicionarCoordenada = function () {
                        var iconFeature = new ol.Feature({
                            geometry: new ol.geom.Point(coordinate),
                            name: 'teste',
                            description: 'value.descricao'
                        });
                        ctrl.getLayerSelecionado().getSource().addFeature(iconFeature);
                        scope.close();
                    };

                    scope.close = function () {
                        overlay.setPosition(undefined);
                        return false;
                    };

                    var overlay = new ol.Overlay({
                        element: container
                    });

                    ctrl.getMap().addOverlay(overlay);

                    ctrl.getMap().on('click', function (evt) {
                        coordinate = evt.coordinate;
                        overlay.setPosition(coordinate);
                    });
                }
            };
        });
