module.exports = function (router, pg) {
   
	router.get('/protocolo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, nome, descricao, municipio FROM protocolo", function(err, result) {
    		
    			//call `done()` to release the client back to the pool
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


	router.post('/protocolo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("INSERT INTO protocolo(nome, descricao, municipio) values($1, $2, $3)",
	    		[req.body.nome, req.body.descricao, req.body.municipio], function(err, result) {
    		
    			//call `done()` to release the client back to the pool
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

	router.get('/protocolo/:codigo', function(req, res){
		req.session.cookie.originalMaxAge = 600000;
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, nome, descricao, municipio FROM protocolo WHERE codigo = $1 ",
	    		[req.params.codigo], function(err, result) {
    		
    			//call `done()` to release the client back to the pool
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

	router.put('/protocolo/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("UPDATE protocolo SET nome = ($1), descricao = ($2), municipio = ($3) WHERE codigo = $4 ",
	    		[req.body.nome, req.body.descricao, req.body.municipio, req.params.codigo], function(err, result) {
    		
    			//call `done()` to release the client back to the pool
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

	router.delete('/protocolo/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("DELETE FROM protocolo WHERE codigo = ($1) ",
	    		[req.params.codigo], function(err, result) {
    		
    			//call `done()` to release the client back to the pool
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