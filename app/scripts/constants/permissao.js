angular.module('geoLayerApp')
        .constant("PERMISSAO", {
            ADMINISTRADOR: {valor: "ADMINISTRADOR", nome: "Administrador", descricao: "Administrador do sistema", nivel: 0},
            VISUALIZADOR: {valor: "VISUALIZADOR", nome: "Visualizador", descricao: "Possui permissão somente para visualização", nivel: 10},
            OPERADOR: {valor: "OPERADOR", nome: "Operador", descricao: "Responsável pelos chamados de ocorrências", nivel: 20},
            ENCARREGADO: {valor: "ENCARREGADO", nome: "Encarregado", descricao: "Encarregado de um ou mais passos da ocorrência", nivel: 30},
        });

