CREATE TABLE grupo (codigo SERIAL PRIMARY KEY NOT NULL,  nome varchar NULL,  descricao varchar NULL);

CREATE TABLE categoria_layer (codigo SERIAL PRIMARY KEY NOT NULL,  nome  varchar NULL UNIQUE);

CREATE TABLE layer ( codigo SERIAL PRIMARY KEY NOT NULL, nome varchar NULL, descricao varchar NULL, codigo_grupo integer NULL REFERENCES grupo(codigo), formato varchar NULL, cor varchar NULL, tipo varchar NOT NULL DEFAULT 'OCORRENCIA', codigo_categoria_layer integer NULL REFERENCES categoria_layer(codigo));

CREATE TABLE regiao (codigo SERIAL PRIMARY KEY NOT NULL,  nome  varchar NULL UNIQUE);

CREATE TABLE municipio (codigo SERIAL PRIMARY KEY NOT NULL,  nome  varchar NULL UNIQUE, codigo_regiao integer NULL REFERENCES regiao(codigo));

CREATE TABLE usuario (codigo SERIAL PRIMARY KEY NOT NULL, nome varchar NULL, email varchar NULL UNIQUE, documento varchar NULL UNIQUE, tipo varchar NULL, municipio integer NULL REFERENCES municipio(codigo), senha varchar NULL);

CREATE TABLE ponto (codigo SERIAL PRIMARY KEY NOT NULL, descricao varchar NULL, coordenada varchar NULL, status varchar NOT NULL DEFAULT 'PENDENTE', status_data timestamp  DEFAULT now(), codigo_usuario_autorizado integer NULL REFERENCES usuario(codigo), descricao_autorizado varchar  NULL, codigo_layer integer NULL REFERENCES layer(codigo), data timestamp DEFAULT now(), codigo_usuario integer NULL REFERENCES usuario(codigo));

CREATE TABLE dispositivo (codigo SERIAL PRIMARY KEY NOT NULL, descricao varchar NULL, coordenada varchar NULL, endereco varchar NOT NULL, status varchar, status_data timestamp NULL, codigo_layer integer NULL REFERENCES layer(codigo), data timestamp DEFAULT now());

CREATE TABLE protocolo (codigo SERIAL PRIMARY KEY NOT NULL, nome varchar NULL, descricao varchar NULL, municipio integer NULL REFERENCES municipio(codigo));

CREATE TABLE tipo_dispositivo (codigo SERIAL PRIMARY KEY NOT NULL,  nome  varchar NULL UNIQUE, codigo_categoria_layer integer NULL REFERENCES categoria_layer(codigo));

CREATE TABLE gamefication (codigo SERIAL PRIMARY KEY NOT NULL, valor integer DEFAULT 0, data timestamp DEFAULT now(), codigo_usuario integer NULL REFERENCES usuario(codigo), codigo_ponto integer NULL REFERENCES ponto(codigo));

CREATE TABLE usuario_grupo (codigo_usuario integer NULL REFERENCES usuario(codigo), codigo_grupo integer NULL REFERENCES grupo(codigo));

insert INTO municipio(nome) values ('Florianopolis');
insert INTO usuario (nome, email, documento, tipo, municipio, senha) VALUES ('Administrador do sistema','adm','2345','ADMINISTRADOR',1,'1234');
insert INTO usuario (nome, email, documento, tipo, municipio, senha) VALUES ('Visualizador do sistema','vis','1234','VISUALIZADOR',1,'1234');
insert INTO usuario (nome, email, documento, tipo, municipio, senha) VALUES ('Operador do sistema','ope','4567','OPERADOR',1,'1234');
insert INTO usuario (nome, email, documento, tipo, municipio, senha) VALUES ('Encarregado do sistema','enc','8909','ENCARREGADO',1,'1234');

insert INTO grupo (nome, descricao) values ('Saneamento', 'Saneamento basico');
insert INTO categoria_layer (nome) values ('categoria 1');

insert INTO layer(nome, descricao, codigo_grupo , formato, cor, tipo, codigo_categoria_layer) values ('layer 1'insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 110', '-5414390.869240167,-3188897.6021485897','APROVADO',1, date '2015-10-01' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 101', '-5415308.113579589,-3189470.8798607285','APROVADO',1, date '2015-10-01' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 102', '-5415804.954263443,-3189203.35026173','APROVADO',1, date '2015-09-29' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 103', '-5414505.524782594,-3189967.7205445822','APROVADO',1, date '2015-09-29' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 104', '-5415919.609805871,-3190273.4686577227','APROVADO',1, date '2015-09-29' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 105', '-5414008.684098741,-3190655.6537991487','APROVADO',1, date '2015-09-29' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 106', '-5413320.750844174,-3190617.435285006','APROVADO',1, date '2015-09-29' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 107', '-5414199.776669454,-3190655.6537991487','APROVADO',1, date '2015-09-30' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 108', '-5414734.835867451,-3191037.838940575','APROVADO',1, date '2015-09-30' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 109', '-5415728.517235157,-3191190.712997145','APROVADO',1, date '2015-09-30' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 110', '-5415728.517235157,-3191381.805567858','APROVADO',1, date '2015-09-30' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 111', '-5414964.146952306,-3191381.805567858','APROVADO',1, date '2015-09-30' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 112', '-5414620.180325023,-3191381.805567858','APROVADO',1, date '2015-09-30' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 113', '-5413206.095301746,-3191076.0574547173','APROVADO',1, date '2015-10-01' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 114', '-5412862.128674463,-3191725.7721951413','APROVADO',1, date '2015-10-01' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 115', '-5414008.684098741,-3191725.7721951413','APROVADO',1, date '2015-10-01' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 116', '-5414811.272895736,-3191725.7721951413','APROVADO',1, date '2015-10-01' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 117', '-5415002.3654664485,-3191840.427737569','APROVADO',1, date '2015-10-01' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 118', '-5414123.339641169,-3192146.1758507094','APROVADO',1, date '2015-10-01' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 119', '-5413358.969358317,-3192795.890591134','APROVADO',1, date '2015-10-01' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 120', '-5412785.691646178,-3192757.672076991','APROVADO',1, date '2015-10-01' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 121', '-5412174.195419896,-3192451.9239638504','APROVADO',1, date '2015-10-02' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 122', '-5413473.624900745,-3193866.008987126','APROVADO',1, date '2015-10-02' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 123', '-5414620.180325023,-3193904.2275012685','APROVADO',1, date '2015-10-02' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 124', '-5415040.583980591,-3194171.757100267','APROVADO',1, date '2015-10-02' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 125', '-5413435.406386603,-3194018.8830436966','APROVADO',1, date '2015-10-02' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 126', '-5412365.28799061,-3194018.8830436966','APROVADO',1, date '2015-10-02' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 127', '-5412288.850962325,-3194209.9756144094','APROVADO',1, date '2015-10-02' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 128', '-5412288.850962325,-3194324.631156837','APROVADO',1, date '2015-10-02' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 129', '-5412785.691646178,-3194324.631156837','APROVADO',1, date '2015-10-02' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 130', '-5413053.221245176,-3194859.6903548334','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 131', '-5413053.221245176,-3195394.7495528297','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 132', '-5413206.095301746,-3195624.060637685','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 133', '-5413206.095301746,-3196464.867948822','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 134', '-5413091.439759319,-3196388.430920537','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 135', '-5412135.976905754,-3196388.430920537','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 136', '-5412135.976905754,-3196273.775378109','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 137', '-5412288.850962325,-3196120.9013215387','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 138', '-5411600.917707758,-3196120.9013215387','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 139', '-5411256.951080475,-3196159.1198356813','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 140', '-5411333.38810876,-3195356.531038687','APROVADO',1, date '2015-10-03' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 141', '-5411180.51405219,-3195968.0272649685','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 142', '-5410377.925255195,-3195318.3125245445','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 143', '-5410377.925255195,-3195509.4050952573','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 144', '-5410377.925255195,-3196120.9013215387','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 145', '-5409957.521599627,-3196503.086462965','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 146', '-5410683.673368336,-3197420.3308023866','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 147', '-5412174.195419896,-3197496.7678306717','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 148', '-5412174.195419896,-3198872.634339805','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 149', '-5411065.858509762,-3198414.012170094','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 150', '-5411448.043651188,-3198261.138113524','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 151', '-5410645.454854193,-3198261.138113524','APROVADO',1, date '2015-10-04' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 152', '-5410110.395656197,-3198031.827028668','APROVADO',1, date '2015-10-05' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 153', '-5409957.521599627,-3198031.827028668','APROVADO',1, date '2015-10-05' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 154', '-5409957.521599627,-3198414.012170094','APROVADO',1, date '2015-10-05' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 155', '-5409957.521599627,-3196961.708632676','APROVADO',1, date '2015-10-05' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 156', '-5409957.521599627,-3196579.52349125','APROVADO',1, date '2015-10-07' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 157', '-5409078.495774347,-3195968.0272649685','APROVADO',1, date '2015-10-07' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 158', '-5405677.048015657,-3197611.4233731','APROVADO',1, date '2015-10-07' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 159', '-5405371.299902516,-3197267.4567458164','APROVADO',1, date '2015-10-07' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 160', '-5408008.377378355,-3198566.8862266643','APROVADO',1, date '2015-10-08' + interval '1 hour');
insert INTO ponto(descricao, coordenada, status, codigo_layer, data) values ('ponto 161', '-5407817.284807642,-3197076.3641751036','APROVADO',1, date '2015-10-09' + interval '1 hour');