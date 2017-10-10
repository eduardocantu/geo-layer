'use strict';

/**
 * @ngdoc overview
 * @name geoLayerApp
 * @description
 * # geoLayerApp
 *
 * Main module of the application.
 */var imap =
        angular
        .module('geoLayerApp', [
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'angularUtils.directives.dirPagination',
            'components',
            'ngStorage',
            'ui.bootstrap',
            'FILTERS'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/listUsuario', {
                        templateUrl: 'views/usuario/listUsuario.html',
                        controller: 'ListUsuarioCtrl'
                    })
                    .when('/formUsuario', {
                        templateUrl: 'views/usuario/formUsuario.html',
                        controller: 'FormUsuarioCtrl'
                    })
                    .when('/formUsuario/:codigo', {
                        templateUrl: 'views/usuario/formUsuario.html',
                        controller: 'FormUsuarioCtrl'
                    })
                    .when('/listRegiao', {
                        templateUrl: 'views/regiao/listRegiao.html',
                        controller: 'ListRegiaoCtrl'
                    })
                    .when('/formRegiao', {
                        templateUrl: 'views/regiao/formRegiao.html',
                        controller: 'FormRegiaoCtrl'
                    })

                    .when('/formRegiao/:codigo', {
                        templateUrl: 'views/regiao/formRegiao.html',
                        controller: 'FormRegiaoCtrl'
                    })
                    .when('/listMunicipio', {
                        templateUrl: 'views/municipio/listMunicipio.html',
                        controller: 'ListMunicipioCtrl'
                    })
                    .when('/formMunicipio', {
                        templateUrl: 'views/municipio/formMunicipio.html',
                        controller: 'FormMunicipioCtrl'
                    })

                    .when('/formMunicipio/:codigo', {
                        templateUrl: 'views/municipio/formMunicipio.html',
                        controller: 'FormMunicipioCtrl'
                    })
                    .when('/listProtocolo', {
                        templateUrl: 'views/protocolo/listProtocolo.html',
                        controller: 'ListProtocoloCtrl'
                    })
                    .when('/formProtocolo', {
                        templateUrl: 'views/protocolo/formProtocolo.html',
                        controller: 'FormProtocoloCtrl'
                    })
                    .when('/formProtocolo/:codigo', {
                        templateUrl: 'views/protocolo/formProtocolo.html',
                        controller: 'FormProtocoloCtrl'
                    })

                    .when('/listGrupo', {
                        templateUrl: 'views/grupo/listGrupo.html',
                        controller: 'ListGrupoCtrl'
                    })
                    .when('/formGrupo', {
                        templateUrl: 'views/grupo/formGrupo.html',
                        controller: 'FormGrupoCtrl'
                    })
                    .when('/formGrupo/:codigo', {
                        templateUrl: 'views/grupo/formGrupo.html',
                        controller: 'FormGrupoCtrl'
                    })
                    .when('/listLayer', {
                        templateUrl: 'views/layer/listLayer.html',
                        controller: 'ListLayerCtrl'
                    })
                    .when('/formLayer', {
                        templateUrl: 'views/layer/formLayer.html',
                        controller: 'FormLayerCtrl'
                    })
                    .when('/formLayer/:codigo', {
                        templateUrl: 'views/layer/formLayer.html',
                        controller: 'FormLayerCtrl'
                    })
                    .when('/listCategoriaLayer', {
                        templateUrl: 'views/categoria_layer/listCategoriaLayer.html',
                        controller: 'ListCategoriaLayerCtrl'
                    })
                    .when('/formCategoriaLayer', {
                        templateUrl: 'views/categoria_layer/formCategoriaLayer.html',
                        controller: 'FormCategoriaLayerCtrl'
                    })
                    .when('/formCategoriaLayer/:codigo', {
                        templateUrl: 'views/categoria_layer/formCategoriaLayer.html',
                        controller: 'FormCategoriaLayerCtrl'
                    })
                    .when('/listTipoDispositivo', {
                        templateUrl: 'views/tipo_dispositivo/listTipoDispositivo.html',
                        controller: 'ListTipoDispositivoCtrl'
                    })
                    .when('/formTipoDispositivo', {
                        templateUrl: 'views/tipo_dispositivo/formTipoDispositivo.html',
                        controller: 'FormTipoDispositivoCtrl'
                    })
                    .when('/formTipoDispositivo/:codigo', {
                        templateUrl: 'views/tipo_dispositivo/formTipoDispositivo.html',
                        controller: 'FormTipoDispositivoCtrl'
                    })
                    .when('/listDispositivo', {
                        templateUrl: 'views/dispositivo/listDispositivo.html',
                        controller: 'ListDispositivoCtrl'
                    })
                    .when('/formDispositivo', {
                        templateUrl: 'views/dispositivo/formDispositivo.html',
                        controller: 'FormDispositivoCtrl'
                    })
                    .when('/formDispositivo/:codigo', {
                        templateUrl: 'views/dispositivo/formDispositivo.html',
                        controller: 'FormDispositivoCtrl'
                    })
                    .when('/mapa', {
                        templateUrl: 'views/mapa/mapa.html',
                        controller: 'MapaCtrl'
                    })
                    .when('/gamefication', {
                        templateUrl: 'views/gamefication/gamefication.html',
                        controller: 'GameficationCtrl'
                    })  
                    .when('/minhasOcorrencias', {
                        templateUrl: 'views/ocorrencia/ocorrencia.html',
                        controller: 'OcorrenciaCtrl'
                    })                    
                    .otherwise({
                        templateUrl: 'views/auth/initial.html',
                        controller: 'AuthCtrl'
                    });
        }).run(function($rootScope, $localStorage) {
            $rootScope.permissao = undefined;

            $rootScope.getPermissao = function () {
                if ($rootScope.permissao) {
                    return $rootScope.permissao;
                }

                if ($localStorage.permissao) {
                    return $localStorage.permissao;
                }

                return "";
    }
});
