angular.module('geoLayerApp')
        .constant("FORMATOS", {
            CIRCULO: {
                nome: 'Circulo',
                valor: 'CIRCULO',
                getStyle: function (cor) {
                    return new ol.style.Circle({
                        radius: 5,
                        fill: new ol.style.Fill({
                            color: cor.rgb(0.3)
                        }),
                        stroke: new ol.style.Stroke({
                            color: cor.rgb(0.8),
                            width: 1.25
                        })
                    });
                }
            },
            QUADRADO: {
                nome: 'Quadrado',
                valor: 'QUADRADO',
                getStyle: function (cor) {
                    return new ol.style.RegularShape({
                        points: 4,
                        radius: 10,
                        angle: Math.PI / 4,
                        fill: new ol.style.Fill({
                            color: cor.rgb(0.3)
                        }),
                        stroke: new ol.style.Stroke({
                            color: cor.rgb(0.8),
                            width: 1.25
                        })
                    });
                }
            },
            TRIANGULO: {
                nome: 'Triângulo',
                valor: 'TRIANGULO',
                getStyle: function (cor) {
                    return new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: Math.PI / 4,
                        angle: 0,
                        fill: new ol.style.Fill({
                            color: cor.rgb(0.3)
                        }),
                        stroke: new ol.style.Stroke({
                            color: cor.rgb(0.8),
                            width: 1.25
                        })
                    });
                }
            },
            ESTRELA: {
                nome: 'Estrela',
                valor: 'ESTRELA',
                getStyle: function (cor) {
                    return new ol.style.RegularShape({
                        points: 5,
                        radius: 10,
                        radius2: 4,
                        angle: 0,
                        fill: new ol.style.Fill({
                            color: cor.rgb(0.3)
                        }),
                        stroke: new ol.style.Stroke({
                            color: cor.rgb(0.8),
                            width: 1.25
                        })
                    });
                }
            },
            CRUZ: {
                nome: 'Cruz',
                valor: 'CRUZ',
                getStyle: function (cor) {
                    return new ol.style.RegularShape({
                        points: 4,
                        radius: 10,
                        radius2: 0,
                        angle: 0,
                        fill: new ol.style.Fill({
                            color: cor.rgb(0.3)
                        }),
                        stroke: new ol.style.Stroke({
                            color: cor.rgb(0.8),
                            width: 1.25
                        })
                    });
                }
            },
            XIS: {
                nome: 'Xis',
                valor: 'XIS',
                getStyle: function (cor) {
                    return new ol.style.RegularShape({
                        points: 4,
                        radius: 10,
                        radius2: 0,
                        angle: Math.PI / 4,
                        fill: new ol.style.Fill({
                            color: cor.rgb(0.3)
                        }),
                        stroke: new ol.style.Stroke({
                            color: cor.rgb(0.8),
                            width: 1.25
                        })
                    });
                }
            }
        });