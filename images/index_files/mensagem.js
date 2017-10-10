'use strict';
/**
 * wellington.nukamoto
 * modulo para disparo de mensagem.
 * 
 * Importe mensagem em seu controller;
 *
 * Para mensagem default:
 * 1 - no html use <mensagem></mensagem>
 * 2 - na chamada do controller:
 * mensagem.success('mensagem');
 * mensagem.info('mensagem');
 * mensagem.warning('mensagem');
 * mensagem.danger('mensagem');
 *
 * Para mensagem específicas:
 * 1 - no html use <mensagens id="teste"></mensagens>
 * 2 - na chamada do controller:
 * mensagem.id('teste').success('mensagem');
 * mensagem.id('teste').info('mensagem');
 * mensagem.id('teste').warning('mensagem');
 * mensagem.id('teste').danger('mensagem');
 *
 * Criado uma factory, para ser possível a chamada por um controller;
 * Criado duas diretivas para mensagem default e outra para mensagem específica;
 = 
 */
angular.module('geoLayerApp')
        .factory('mensagem', function () {
            /**
             * funcoes para os tipos de mensagem.
             */
            var _success = function (msg) {
                this.status = 'alert-success';
                this.message = msg;
            };
            var _info = function (msg) {
                this.status = 'alert-info';
                this.message = msg;
            };
            var _warning = function (msg) {
                this.status = 'alert-warning';
                this.message = msg;
            };
            var _danger = function (msg) {
                this.status = 'alert-danger';
                this.message = msg;
            };
            var _clear = function () {
                this.status = undefined;
                this.message = undefined;
            };

            var _id = function (id) {
                statuses = this.statuses;
                messages = this.messages;
                var _success = function (msg) {
                    statuses[id] = 'alert-success';
                    messages[id] = msg;
                };
                var _info = function (msg) {
                    statuses[id] = 'alert-info';
                    messages[id] = msg;
                };
                var _warning = function (msg) {
                    statuses[id] = 'alert-warning';
                    messages[id] = msg;
                };
                var _danger = function (msg) {
                    statuses[id] = 'alert-danger';
                    messages[id] = msg;
                };
                var _clear = function () {
                    statuses[id] = undefined;
                    messages[id] = undefined;
                };

                return {
                    success: _success,
                    info: _info,
                    warning: _warning,
                    danger: _danger,
                    clear: _clear
                };
            };
            return {
                status: null,
                message: null,
                statuses: [],
                messages: [],
                success: _success,
                info: _info,
                warning: _warning,
                danger: _danger,
                clear: _clear,
                id: _id
            }
        }).directive('mensagem', function () {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function ($scope, mensagem) {
            $scope.show = false;
            $scope.api = mensagem;

            $scope.$watch('api.status', toggle);
            $scope.$watch('api.message', toggle);

            $scope.hide = function () {
                $scope.show = false;
                $scope.api.clear();
            };

            $scope.$on('$routeChangeStart', function () {
                $scope.hide();
            });

            function toggle() {
                $scope.show = !!($scope.api.status && $scope.api.message);
            }
        },
        template: '<div class="alert {{api.status}}" ng-show="show">' +
                ' <button type="button" class="close" ng-click="hide()">&times;</button>' +
                ' {{api.message}}' +
                '</div>'
    }
}).directive('mensagens', function () {
    return {
        restrict: 'E',
        scope: {
            id: "@"
        },
        replace: true,
        controller: function ($scope, mensagem) {
            $scope.show = false;
            $scope.api = mensagem;
            $scope.$watch('api.statuses[id]', toggle);
            $scope.$watch('api.messages[id]', toggle);

            $scope.hide = function () {
                $scope.show = false;
                $scope.api.id($scope.id).clear();
            };
            
            $scope.$on('$routeChangeStart', function () {
                $scope.hide();
            });
            
            function toggle() {
                $scope.show = !!($scope.api.statuses[$scope.id] && $scope.api.messages[$scope.id]);
            }
        },
        template: '<div class="alert {{api.statuses[id]}}" ng-show="show">' +
                ' <button type="button" class="close" ng-click="hide()">&times;</button>' +
                ' {{api.messages[id]}}' +
                '</div>'
    }
});
