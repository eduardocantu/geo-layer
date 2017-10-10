module.exports = function (router, pg) {
   
	router.get('/usuario', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");
	    	var query = conn.query("SELECT codigo, nome, email, documento, tipo, municipio FROM usuario WHERE codigo != $1",[req.cookies.codigo_usuario | req.session.codigo_usuario], function(err, result) {
    		
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


	router.post('/usuario', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("INSERT INTO usuario(nome, email, documento, tipo, municipio) values($1, $2, $3, $4, $5)",
	    		[req.body.nome, req.body.email, req.body.documento, req.body.tipo, req.body.municipio], function(err, result) {
    	
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

	router.get('/usuario/:codigo', function(req, res){
		req.session.cookie.originalMaxAge = 600000;
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, nome, email, documento, tipo, municipio FROM usuario WHERE codigo = $1 ",
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

	router.put('/usuario/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("UPDATE usuario SET nome = ($1), email = ($2), documento = ($3), tipo = ($4), municipio = ($5) WHERE codigo = $6 ",
	    		[req.body.nome, req.body.email, req.body.documento, req.body.tipo, req.body.municipio,  req.params.codigo], function(err, result) {
    		
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

	router.delete('/usuario/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("DELETE FROM usuario WHERE codigo = ($1) ",
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