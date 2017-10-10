module.exports = function (router, pg) {

	router.get('/ponto', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, descricao, coordenada, status, status_data, codigo_usuario_autorizado, descricao_autorizado, data "
          + " FROM ponto" , function(err, result) {
    		
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

	router.get('/ponto/layer/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, descricao, coordenada, status, status_data, codigo_usuario_autorizado, descricao_autorizado, data FROM ponto WHERE codigo_layer = $1 "
          + " AND data BETWEEN ($2) AND ($3)", [req.params.codigo, req.query.data_inicio, req.query.data_fim], function(err, result) {
    		
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

	router.put('/ponto/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("UPDATE ponto SET descricao = ($1), coordenada = ($2), status = ($3), status_data = ($4), " +
          "codigo_usuario_autorizado = ($5), descricao_autorizado = ($6), data = ($7) WHERE codigo = $8 ",
	    		[req.body.descricao, req.body.coordenada, req.body.status, req.body.status_data,
          req.body.codigo_usuario_autorizado, req.body.descricao_autorizado, req.body.data, req.params.codigo], function(err, result) {
    		
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

	router.delete('/ponto/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("DELETE FROM ponto WHERE codigo = ($1) ",
	    		[req.params.codigo], function(err, result) {
    		
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