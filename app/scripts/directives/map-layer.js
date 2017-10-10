'use strict';
angular.module('geoLayerApp')
        .directive('mapLayer', function () {
            return {
                restrict: 'E',
                require: "^mapMain",
                replace: true,
                link: function (scope, element, attrs, ctrl) {
                    var iconFeatures;
                    var iconFeature;
                    var iconStyle = new ol.style.Style({
                        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                            anchor: [0.5, 46],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            opacity: 0.75,
                            src: 'images/yeoman.png'
                        }))
                    });

                    scope.adicionarLayer = function (id, nome, features) {

                        var vectorSource;
                        var vectorLayer;

                        vectorSource = new ol.source.Vector({
                            features: features //add an array of features
                        });

                        vectorLayer = new ol.layer.Vector({
                            source: vectorSource,
                            style: iconStyle,
                            codigo: id,
                            nome: nome
                        });
                        ctrl.getMap().addLayer(vectorLayer);
                        return vectorLayer;
                    };

                    //lista os layers
                    angular.forEach(ctrl.getLayers(), function (layer, layerIndex) {
                        var layer;
                        iconFeatures = [];
                        //lista as coordenadas
                        angular.forEach(layer.coordenadas, function (coordenada, coordenadaIndex) {
                            iconFeature = new ol.Feature({
                                geometry: new ol.geom.Point(ol.proj.transform(coordenada.valor, 'EPSG:4326',
                                        'EPSG:3857')),
                                name: coordenadaIndex,
                                description: coordenada.descricao
                            });
                            iconFeatures.push(iconFeature);
                        });

                        layer = scope.adicionarLayer(layer.codigo, layer.nome, iconFeatures);
                        if (!layerIndex) {
                            ctrl.setLayerSelecionado(layer);
                        }
                    });

                    ctrl.setScopeMap(scope);

                }
            };
        });
