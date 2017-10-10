'use strict';
angular.module('geoLayerApp')
        .constant("RESOURCE", {
            usuario: {
                url: "http://localhost/usuario",
                porta: "8080",
                mock: "//..//mock//usuarios.json"
            },
            municipio: {
                url: "http://localhost/municipio",
                porta: "8080"
            },
            layer: {
                url: "http://localhost/layer",
                porta: "8080"
            }
        });