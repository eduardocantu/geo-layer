'use strict';

/**
 * @ngdoc overview
 * @name geoLayerApp
 * @description
 * # geoLayerApp
 *
 * Main module of the application.
 */
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
    'components'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/listUsuario', {
        templateUrl: 'views/usuario/listUsuario.html',
        controller: 'ListUsuarioCtrl'
      })
      .when('/formUsuario', {
        templateUrl: 'views/usuario/formUsuario.html',
        controller: 'FormUsuarioCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
