angular.module('geoLayerApp')
        .constant("CORES", {
            AMARELO: {nome: 'Amarelo',
                valor: 'AMARELO',
                hex: '#FFFF00',
                rgb: function (transparencia) {
                    return 'rgba(255,255,0,' + transparencia + ')';
                }
            },
            AMARELO_ESCURO: {nome: 'Amarelo Escuro',
                valor: 'AMARELO_ESCURO',
                hex: '#EEAD0E',
                rgb: function (transparencia) {
                    return 'rgba(238,173,14,' + transparencia + ')';
                }
            },
            AZUL: {nome: 'Azul',
                valor: 'AZUL',
                hex: '#0000FF',
                rgb: function (transparencia) {
                    return 'rgba(0,0,255,' + transparencia + ')';
                }},
            AZUL_ESCURO: {nome: 'Azul Escuro',
                valor: 'AZUL_ESCURO',
                hex: '#0000CD',
                rgb: function (transparencia) {
                    return 'rgba(0,0,205,' + transparencia + ')';
                }},
            VERDE: {nome: 'verde',
                valor: 'VERDE',
                hex: '#00FF00',
                rgb: function (transparencia) {
                    return 'rgba(0,255,0,' + transparencia + ')';
                }},
            VERDE_ESCURO: {nome: 'Verde Escuro',
                valor: 'VERDE_ESCURO',
                hex: '#006400',
                rgb: function (transparencia) {
                    return 'rgba(0,100,0,' + transparencia + ')';
                }},
            VERMELHO: {nome: 'Vermelho',
                valor: 'VERMELHO',
                hex: '#FF0000',
                rgb: function (transparencia) {
                    return 'rgba(255,0,0,' + transparencia + ')';
                }},
            VERMELHO_ESCURO: {nome: 'Vermelho Escuro',
                valor: 'VERMELHO_ESCURO',
                hex: '#8B0000',
                rgb: function (transparencia) {
                    return 'rgba(139,0,0,' + transparencia + ')';
                }
            }
        });