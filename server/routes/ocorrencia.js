module.exports = function (router, pg) {

  var zeroFill = function(codigo) {
    return String('0000000000' + codigo).slice(-10);
  };

	router.post('/ocorrencia', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("INSERT INTO ponto(descricao, coordenada, codigo_layer, codigo_usuario)" +
          " values($1, $2, $3, $4) RETURNING *",
	    		[req.body.descricao, req.body.coordenada, req.body.codigo_layer, req.body.codigo_usuario], function(err, result) {
    		
    			done();

    			if(err) {
    				res.sendStatus(400);
      		  return console.error('error running query', err);
    			}
    			conn.end();
          var retorno = {
            codigo: zeroFill(result.rows[0].codigo),
            descricao: "Ocorrência efetuada com sucesso!"
          };
          return res.json(retorno);
  			});
		});
	});

  router.get('/ocorrencia/usuario', function(req, res){
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT status, status_data, descricao_autorizado, data FROM ponto WHERE codigo_usuario = $1 order by status_data desc", [req.cookies.codigo_usuario], function(err, result) {
        
          done();

          if(err) {
            res.sendStatus(400);
            conn.end();
            return console.error('error running query', err);
          }
          
          return res.json(result);
        });
    });
  });

	router.put('/ocorrencia/aprovado/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("UPDATE ponto SET status = ($1), status_data = ($2), " +
          "codigo_usuario_autorizado = ($3), descricao_autorizado = ($4) WHERE codigo = $5 ",
	    		["APROVADO", new Date(), req.cookies.codigo_usuario, req.body.descricao_autorizado, parseInt(req.params.codigo)], function(err, result) {
    		
    			done();

    			if(err) {
    				res.sendStatus(400);
      			return console.error('error running query', err);
    			}
    			conn.end();
          return res.json(result);
  			});
		});
	});

  router.put('/ocorrencia/rejeitado/:codigo', function(req, res){  
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE ponto SET status = ($1), status_data = ($2), " +
          "codigo_usuario_autorizado = ($3), descricao_autorizado = ($4) WHERE codigo = $5 ",
          ["REJEITADO", new Date(), req.cookies.codigo_usuario, req.body.descricao_autorizado, parseInt(req.params.codigo)], function(err, result) {
        
          done();

          if(err) {
            res.sendStatus(400);
            return console.error('error running query', err);
          }
          conn.end();
          return res.json(result);
        });
    });
  });  
};