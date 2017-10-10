'use strict';
angular.module('geoLayerApp')
        .directive('mapMain', function () {
            return {
                restrict: 'E',
                scope: {
                    layers: "="
                },
                transclude: true,
                replace: true,
                template: '<div>' +
                        '<div class="modal fade" id="modal-label" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                        '<div class="modal-dialog">' +
                        '<div class="modal-content">' +
                        '<div class="modal-header">' +
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<h4 class="modal-title" id="myModalLabel">Novo layer</h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        '<div class="form-horizontal">' +
                        '<div class="form-group">' +
                        '<label for="inputNome" class="col-sm-2 control-label">Nome</label>' +
                        '<div class="col-sm-10">' +
                        '<input type="text" class="form-control" id="inputNome" placeholder="Nome do layer" ng-model="form.nome">' +
                        '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label for="inputDescricao" class="col-sm-2 control-label">Descricao</label>' +
                        '<div class="col-sm-10">' +
                        '<input type="text" class="form-control" id="inputDescricao" placeholder="Breve descricao para seu label" ng-model="form.descricao">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-default" ng-click="fecharModal(\'#modal-label\')">Cancelar</button>' +
                        '<button type="button" class="btn btn-primary" ng-click="adicionarLayer()">Adicionar</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        
                        '<div class="modal fade" id="modal-delete-label" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                        '<div class="modal-dialog">' +
                        '<div class="modal-content">' +
                        '<div class="modal-header">' +
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<h4 class="modal-title" id="myModalLabel">Exluir layer? </h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        '<div class="form-horizontal">' +
                        'Deseja realmente exluir o layer [{{layerSelecionado.get(\'nome\')}}]?' +
                        '</div>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-default" ng-click="fecharModal(\'#modal-delete-label\')">Cancelar</button>' +
                        '<button type="button" class="btn btn-primary" ng-click="excluirLayer()">Excluir</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        
                        '<div class=" panel-default col-md-2">' +
                        '<div class="panel panel-default">' +
                        '<div class="panel-body">' +
                        '<a data-toggle="modal" data-target="#modal-label">' +
                        '<i class="glyphicon glyphicon-plus-sign"></i>' +
                        '</a>' +
                        '<a data-toggle="modal" data-target="#modal-delete-label">' +
                        '<i class="glyphicon glyphicon-minus-sign"></i>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '<ul class="list-group">' +
                        '<li class="list-group-item" ng-repeat="layer in map.getLayers().getArray()" ng-class="{active : layerSelecionado == layer}" ng-click="selecionaLayer(layer)" ng-hide="!layer.get(\'nome\')">{{layer.get(\'nome\')}}' +
                        '<a class="badge" ng-click="setVisible(layer)">' +
                        '<i class="glyphicon" ng-class="{\'glyphicon-eye-open\' : layer.getVisible(), \'glyphicon-eye-close\' : !layer.getVisible()}"></i>' +
                        '</a>' +
                        '</li>' +
                        '</ul>' +
                        '</div>' +
                        '<div id="map" class="smallmap col-md-10"></div>' +
                        '<div ng-transclude></div>' +
                        '</div>',
                controller: function ($scope, $element, $attrs) {
                    $scope.visible = true;
                    $scope.layerSelecionado;
                    var scopeMap;
                    $scope.map = new ol.Map({
                        target: 'map',
                        controls: ol.control.defaults().extend([
                            new ol.control.FullScreen()
                        ]),
                        layers: [
                            new ol.layer.Tile({
                                source: new ol.source.MapQuest({layer: 'sat'})
                            })
                        ],
                        //overlays: [ctrl.getOverlay()],
                        view: new ol.View({
                            center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
                            zoom: 4
                        })
                    });

                    this.getMap = function () {
                        return $scope.map;
                    };

                    this.getLayers = function () {
                        return $scope.layers;
                    };

                    this.setScopeMap = function (scope) {
                        scopeMap = scope;
                    };

                    this.getLayerSelecionado = function () {
                        return $scope.layerSelecionado;
                    };

                    this.setLayerSelecionado = function (lyr) {
                        $scope.layerSelecionado = lyr;
                    };

                    var limparFormulario = function () {
                        $scope.form = {};
                        $scope.form.nome;
                        $scope.form.descricao;
                    };

                    limparFormulario();

                    $scope.setVisible = function (lyr) {
                        lyr.setVisible(!lyr.getVisible());
                    };

                    $scope.selecionaLayer = function (layer) {
                        $scope.layerSelecionado = layer;
                    };

                    $scope.excluirLayer = function () {
                        $scope.fecharModal('#modal-delete-label');
                    };

                    $scope.adicionarLayer = function () {
                        var layer = {};
                        layer.nome = $scope.form.nome;
                        layer.descricao = $scope.form.descricao;
                        layer.coordenadas = [];
                        $scope.layers.push(layer);
                        $scope.fecharModal('#modal-label');
                        if (scopeMap) {
                            $scope.layerSelecionado = scopeMap.adicionarLayer(undefined, layer.nome, []);
                        }
                    };

                    $scope.fecharModal = function (nome) {
                        $(nome).modal('hide');
                        limparFormulario();
                    };
                }
            };
        });
