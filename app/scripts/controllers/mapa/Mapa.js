'use strict';
/**
 * @ngdoc function
 * @name geoPontoApp.controller:PontoCtrl
 * @description
 * # AboutCtrl
 * Controller of the geoPontoApp
 */
angular.module('geoLayerApp')
        .controller('MapaCtrl', function ($scope, $filter, $timeout, mapaService, googleApiService, protocoloService, FORMATOS, CORES, STATUS_OCORRENCIA) {
            var overlay;
            var overlayDispositivo;
            var coordinate;
            $scope.statuses = STATUS_OCORRENCIA;
            $scope.grupoSelecionado;
            $scope.layerSelecionado;
            $scope.pontoSelecionado;
            $scope.grupoFormulario;
            $scope.layerFormulario;
            $scope.formatos = [];
            $scope.cores = [];
            $scope.grupos = [];

            var criarSlider = function() {
                $("#slider").dateRangeSlider({
                    bounds:{
                    min: $scope.dataInicial,
                    max: $scope.dataFinal
                    },
                    formatter:function(val){
                        var days = val.getDate(),
                        month = val.getMonth() + 1,
                        year = val.getFullYear();
                        return days + "/" + month + "/" + year;
                    }
                });
                $("#slider").dateRangeSlider("min", $scope.dataInicial);
                $("#slider").dateRangeSlider("max", $scope.dataFinal);
                $("#slider").bind("valuesChanging", function(e, data){
                    $scope.dataFinalRange = data.values.max;
                    $scope.dataInicialRange  = data.values.min;
                    $scope.inicializar();
                    console.log('ssss');
                });
            };
            
            var subtrairDias = function(data, dias) {
                return new Date(data.getTime() - (dias * 24 * 60 * 60 * 1000));
            };
            
            $scope.dataFinal = new Date();
            $scope.dataFinalRange = $scope.dataFinal;
            $scope.dataInicial = subtrairDias($scope.dataFinal, 30);
            $scope.dataInicialRange = $scope.dataInicial;
            criarSlider();

            //TODO id do usuario
            var features = [];
            var feature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([1, 2], 'EPSG:4326',
                        'EPSG:3857')),
                name: 'teste nome',
                descricao: 'teste descricao'
            });
            features.push(feature);
            angular.forEach(FORMATOS, function (formato) {
                $scope.formatos.push(formato);
            });
            angular.forEach(CORES, function (cor) {
                $scope.cores.push(cor);
            });

            $scope.openInicial = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openedInicial = !$scope.openedInicial;
            };

            $scope.openFinal = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openedFinal = !$scope.openedFinal;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.isInvalidForm = function (form) {
                return $scope[form].$valid;
            };
            $scope.isInvalidField = function (form, field) {
                return $scope[form][field].$invalid && $scope[form][field].$dirty;
            };

            var clearMap = function() {
                //$scope.grupos =[];
                angular.forEach($scope.map.getLayers(), function (layer) {
                    try {
                        layer.getSource().clear();
                    } catch (err) {

                    }
                });
            };


           var view = new ol.View({
                center: [-5418754.3486595405, -3195146.329210903],
                zoom: 12
            });
            $scope.map = undefined;
            $scope.map = new ol.Map({
                target: 'map',
                controls: ol.control.defaults().extend([
                ]),
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: view
            });

            $scope.filtrar = function () {
                clearMap();
                $("#slider").dateRangeSlider(
                  "option",
                  "bounds",
                  {
                    min: $scope.dataInicial,
                    max: $scope.dataFinal
                });
                $("#slider").dateRangeSlider("min", $scope.dataInicial);
                $("#slider").dateRangeSlider("max", $scope.dataFinal);
                mapaService.listarGrupos().then(function (data) {
                    if (data.success === false) {
                        return;
                    }
                    
                    $scope.grupos = data.data.rows;
                    $scope.grupos.forEach(function(grupo){
                        mapaService.listarLayers(grupo).then(function(data){
                            grupo.layers = data.data.rows;
                            if (grupo.layers) {
                                grupo.layers.forEach(function(layer){
                                    layer.visivel_aux = true;
                                    if (layer.tipo === 'DISPOSITIVO'){
                                        mapaService.listarDispositivos(layer, $scope.dataInicial, $scope.dataFinal).then(function(data){
                                            layer.pontos = data.data.rows;
                                            $scope.inicializar();
                                        });
                                    } else {
                                        mapaService.listarPontos(layer, $scope.dataInicial, $scope.dataFinal).then(function(data){
                                            layer.pontos = data.data.rows;
                                            $scope.inicializar();
                                        });
                                    }
                                }); 
                            }       
                        });
                    });                
                });
            };


            $scope.filtrar();

            protocoloService.listarProtocolos().then(function (data) {
                $scope.protocolos = data.data.rows;
            });

            var novoFormulario = function (form) {
                $scope.grupoFormulario = {};
                $scope.layerFormulario = {formato: FORMATOS.CIRCULO.valor, cor: CORES.AZUL.valor};
                if (form) {
                    $scope[form].$setPristine();
                }
            };

            $scope.editarFormulario = function () {
                $scope.grupoFormulario = angular.copy($scope.grupoSelecionado);
                $scope.layerFormulario = angular.copy($scope.layerSelecionado);
            };
            $scope.novoGrupo = function () {
                novoFormulario('formGrupo');
            };
            $scope.novoLayer = function (grupo) {
                novoFormulario('formLayer');
                $scope.layerFormulario.codigo_grupo = grupo.codigo;
            };
            $scope.selecionarGrupo = function (item) {
                $scope.grupoSelecionado = item;
                $scope.layerSelecionado = undefined;
                $scope.layerSelecionado = $scope.getLayerSelecionado(undefined);
            };
            var removerGrupo = function () {
                mapaService.removerGrupo($scope.grupoSelecionado).then(function (data) {
                    angular.forEach($scope.grupos, function (grupo, idx) {
                        if (grupo.codigo == $scope.grupoSelecionado.codigo) {
                            $scope.grupos.splice(idx, 1);
                        }
                    });
                });
                novoFormulario();
            };
            var removerLayer = function () {
                mapaService.removerLayer($scope.layerSelecionado).then(function (data) {
                    $scope.map.removeLayer($scope.layerSelecionado);
                    angular.forEach($scope.grupos, function (grupo) {
                        angular.forEach(grupo.layers, function (layer, idx) {
                            if (layer.codigo == $scope.layerSelecionado.codigo) {
                                grupo.layers.splice(idx, 1);
                            }
                        });
                    });
                });
                novoFormulario();
            };
            $scope.remover = function () {
                if ($scope.layerSelecionado) {
                    removerLayer();
                }

                if ($scope.grupoSelecionado) {
                    removerGrupo();
                }
            };
            $scope.editarGrupo = function () {
                mapaService.editarGrupo($scope.grupoFormulario).then(function (data) {
                    if (data.success) {
                        angular.forEach($scope.grupos, function (grupo, idx) {
                            if (grupo.codigo == $scope.grupoFormulario.codigo) {
                                $scope.grupos[idx] = angular.copy($scope.grupoFormulario);
                                novoFormulario();
                                $scope.grupoSelecionado = undefined;
                            }
                        });
                    }
                });
            };
            $scope.editarLayer = function () {
                mapaService.editarLayer($scope.layerFormulario).then(function (data) {
                    if (data.success) {
                        angular.forEach($scope.grupos, function (grupo) {
                            angular.forEach(grupo.layers, function (layer, idx) {
                                if (layer.codigo == $scope.layerFormulario.codigo) {
                                    grupo.layers[idx] = angular.copy($scope.layerFormulario);
                                    novoFormulario();
                                    $scope.layerSelecionado = undefined;
                                }
                            });
                        });
                    }
                });
            };
            $scope.salvarGrupo = function () {
                mapaService.salvarGrupo($scope.grupoFormulario).then(function (data) {
                    if (data.success) {
                        $scope.grupos.push(data.data.rows[0]);
                    }
                });
            };
            $scope.salvarLayer = function () {
                mapaService.salvarLayer($scope.layerFormulario).then(function (data) {
                    if (data.success) {
                        var layer = data.data.rows[0];
                        var vetor = $scope.novoVetor(layer, []);
                        $scope.map.addLayer(vetor);
                        angular.forEach($scope.grupos, function (grupo) {
                            if (grupo.codigo == layer.codigo_grupo) {
                                layer.visivel_aux = true;
                                grupo.layers.push(layer);
                            }
                        });
                    }
                });
            };
            $scope.toggleVisivel = function (layer) {
                layer.visivel_aux = !layer.visivel_aux;
                if (layer == undefined) {
                    return;
                }
                $scope.getLayerSelecionado(layer.codigo).setVisible(layer.visivel_aux);
            };
            $scope.close = function () {
                overlay.setPosition(undefined);
                return false;
            };
            $scope.adicionarCoordenada = function () {
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(coordinate),
                    name: 'teste',
                    descricao: 'value.descricao'
                });
                $scope.layerSelecionado.getSource().addFeature(iconFeature);
                $scope.close();
            };
      
            var selectInteraction = new ol.interaction.Select({
                //condition: ol.events.condition.pointerMove
            });
            selectInteraction.getFeatures().on('remove', function () {
                $scope.pontoSelecionado = undefined;
                $scope.selecionarLayer(undefined);
                overlay.setPosition(undefined);
            });

            selectInteraction.getFeatures().on('add', function (event) {
                var element = event.element.getProperties();
                $scope.pontoSelecionado = element.ponto;
                $scope.selecionarLayer(element.layer)
                overlay.setPosition(element.ponto.coordenada.split(','));
            });

            $scope.map.addInteraction(selectInteraction);
            $scope.selecionarLayer = function (item) {
                $scope.layerSelecionado = item;
                $scope.grupoSelecionado = undefined;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            $scope.selecionarPonto = function (item) {
                $scope.pontoConfirmacao = undefined;
                $scope.pontoSelecionado = item;
                $scope.selecionarLayer(item.layer);
                var coordenada = item.coordenada.split(',');
                selectInteraction.getFeatures().clear();
                angular.forEach($scope.map.getLayers(), function (layer) {
                    try {
                        angular.forEach(layer.getSource().getFeatures(), function (feature) {
                            if (feature.get('ponto').codigo == item.codigo) {
                                selectInteraction.getFeatures().push(feature);
                                //$scope.map.getView().setCenter(feature.get('ponto').coordenada.split(','));
                                overlay.setPosition(feature.get('ponto').coordenada.split(','));
                                return;
                            }
                        });

                    } catch (err) {
                    }
                });
            };

            $scope.dispositivoSelecionado = {};
            $scope.map.on('click', function (evt) {
                $scope.close();
                coordinate = evt.coordinate;
                console.log(coordinate);
                var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                var lon = lonlat[0];
                var lat = lonlat[1];
                if (!$scope.dispositivoSelecionado.adicionar) {
                    return;
                }
                googleApiService.buscarEndereco(lat + "," + lon).then(function (data) {
                    if (data.success) {
                        $scope.dispositivoSelecionado.endereco = data.data.results[0].formatted_address;
                        $scope.dispositivoSelecionado.coordenada = coordinate[0] + "," + coordinate[1];
                        overlayDispositivo.setPosition(coordinate);
                    }
                });
            });

            $scope.novoVetor = function (layer, features) {

                var vectorSource;
                var vectorLayer;
                var iconStyle;
                iconStyle = new ol.style.Style({
                    image: FORMATOS[layer.formato].getStyle(CORES[layer.cor])
                });
                vectorSource = new ol.source.Vector({
                    features: features //add an array of features
                });
                vectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                    style: iconStyle,
                    layer: layer
                });

                return vectorLayer;
            };
            $scope.inicializar = function () {
                var iconFeatures;
                var container = document.getElementById('popup');
                overlay = new ol.Overlay({
                    element: container
                });
                $scope.map.addOverlay(overlay);

                var containerDispositivo = document.getElementById('popup-dispositivo');
                overlayDispositivo = new ol.Overlay({
                    element: containerDispositivo
                });

                clearMap();
                $scope.map.addOverlay(overlayDispositivo);
                //lista os layers
                angular.forEach($scope.grupos, function (grupo) {
                    angular.forEach(grupo.layers, function (layer) {

                        iconFeatures = [];
                        //lista as coordenadas
                        angular.forEach($filter('dateRange')(layer.pontos, $scope.dataInicialRange, $scope.dataFinalRange), function (ponto) {
                            var iconFeature = new ol.Feature({
                                geometry: new ol.geom.Point(ponto.coordenada.split(',')),
                                layer: layer,
                                ponto: ponto
                            });
                            iconFeatures.push(iconFeature);
                        });
                        var vetor = $scope.novoVetor(layer, iconFeatures);
                        $scope.map.addLayer(vetor);
                    });
                });
            };
            $scope.getLayerSelecionado = function (codigo) {
                var retorno;
                angular.forEach($scope.map.getLayers(), function (layer) {
                    if (layer.get('layer') && layer.get('layer').codigo == codigo) {
                        retorno = layer;
                    }
                });
                return retorno;
            };

            $scope.alterarProtocoloSelecionado = function () {
                $scope.descricaoProtocolo = $scope.protocoloSelecionado.descricao;

            };

            $scope.rejeitarPonto = function () {
                $scope.pontoSelecionado.descricao_autorizado = $scope.descricaoProtocolo;
                mapaService.rejeitarPonto($scope.pontoSelecionado).then(function (data) {
                    $scope.pontoSelecionado = undefined;
                    $scope.protocoloSelecionado = undefined;
                    $scope.descricaoProtocolo = undefined;
                    $scope.selecionarLayer(undefined);
                    overlay.setPosition(undefined);
                    selectInteraction.getFeatures().clear();

                });
            };

            $scope.aprovarPonto = function () {
                $scope.pontoSelecionado.descricao_autorizado = $scope.descricaoProtocolo;
                mapaService.aprovarPonto($scope.pontoSelecionado).then(function (data) {
                    $scope.pontoSelecionado = undefined;
                    $scope.protocoloSelecionado = undefined;
                    $scope.descricaoProtocolo = undefined;
                    $scope.selecionarLayer(undefined);
                    overlay.setPosition(undefined);
                    selectInteraction.getFeatures().clear();
                });
            };

            $scope.dispositivoSelecionado.adicionar = false;
            $scope.novoDispositivo = function(layer) {
                $scope.selecionarLayer(layer);
                $scope.dispositivoSelecionado.layer = layer;
                $scope.dispositivoSelecionado.adicionar = true;
            };

            $scope.cancelarDispositivo = function() {
                overlayDispositivo.setPosition(undefined);
                $scope.dispositivoSelecionado = {};
                return false;
            };

            $scope.salvarDispositivo = function() {
                var dispositivo = {};
                dispositivo.coordenada = $scope.dispositivoSelecionado.coordenada;
                dispositivo.descricao = $scope.dispositivoSelecionado.descricao;
                dispositivo.codigo_layer = $scope.dispositivoSelecionado.layer.codigo;
                mapaService.salvarDispositivo(dispositivo).then(function (data) {
                    if (data.success) {
                         var iconFeature = new ol.Feature({
                                geometry: new ol.geom.Point($scope.dispositivoSelecionado.coordenada.split(',')),
                                layer: $scope.dispositivoSelecionado.layer,
                                ponto: dispositivo
                            });
                            var layer = $scope.getLayerSelecionado($scope.dispositivoSelecionado.layer.codigo);
                            layer.getSource().addFeature(iconFeature);
                        $scope.cancelarDispositivo();
                    }
                });
            };
            $scope.editarDispositivo = function() {
                var dispositivo = {};
                dispositivo.codigo = $scope.dispositivoSelecionado.codigo;
                dispositivo.coordenada = $scope.dispositivoSelecionado.coordenada;
                dispositivo.descricao = $scope.dispositivoSelecionado.descricao;
                dispositivo.codigo_layer = $scope.dispositivoSelecionado.layer.codigo; 
                mapaService.editarDispositivo($scope.grupoFormulario).then(function (data) {
                    if (data.success) {
                        $scope.cancelarDispositivo();
                    }
                });
            };

            var timer;
            var play = function(callback) {
                timer = $timeout(function(){
                    if ($scope.dataFinalRange < $scope.dataFinal) {
                        callback(true);
                        $scope.dataFinalRange = new Date($scope.dataFinalRange.setDate($scope.dataFinalRange.getDate() + 1));
                        $("#slider").dateRangeSlider("max", $scope.dataFinalRange);  
                        $scope.inicializar();
                        play(callback);  
                    } else {
                        callback(false);
                    }
                }, 500);   

            };

            $scope.play = function() {
                $scope.dataFinalRange = $scope.dataInicialRange;
                play(function(playing){
                    $scope.playing = playing;
                });
            };

            $scope.stop = function() {
                $timeout.cancel(timer);
                $scope.playing = false;
                var bounds = $("#slider").dateRangeSlider("option", "bounds");
                $scope.dataFinalRange = bounds.max;
                $scope.dataInicialRange = bounds.min;
                $("#slider").dateRangeSlider("min", bounds.min);
                $("#slider").dateRangeSlider("max", bounds.max);
            };

            $scope.pause = function() {
                $timeout.cancel(timer);
                $scope.playing = false;
            };
        });
