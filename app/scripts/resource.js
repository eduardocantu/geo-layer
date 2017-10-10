'use strict';
angular.module('geoLayerApp')
        .constant("RESOURCE", {
            auth: {
                url: "/login"
            },
            logout: {
                url: "/logout"
            },
            usuario: {
                url: "/usuario"
            },
            regiao: {
                url: "/regiao"
            },            
            municipio: {
                url: "/municipio"
            },
            protocolo: {
                url: "/protocolo"
            },
             grupo: {
                url: "/grupo"
            },
            layer: {
                url: "/layer"
            },
            dispositivo: {
                url: "/dispositivo"
            },  
            categoriaLayer: {
                url: "/categoria_layer"
            },
            tipoDispositivo: {
                url: "/tipo_dispositivo"
            },
            ponto: {
                url: "/ponto"
            },
            ocorrencia: {
                url: "/ocorrencia"
            },  
            gamefication: {
                url: "/gamefication"
            },
            googleapi: {
                address: {
                    url: "https://maps.googleapis.com/maps/api/geocode/json?address="    
                },
                latlng: {
                    url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="    
                }
                
            }
        });