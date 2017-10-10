module.exports = function (router, pg) {
   
	router.get('/municipio', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT mun.codigo as codigo, mun.nome as nome, regiao.nome as regiao  FROM municipio mun LEFT JOIN regiao regiao ON regiao.codigo = mun.codigo_regiao",
          function(err, result) {
    		  
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


	router.post('/municipio', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("INSERT INTO municipio(nome, codigo_regiao) values($1, $2)",
	    		[req.body.nome, req.body.codigo_regiao], function(err, result) {
    		
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

	router.get('/municipio/:codigo', function(req, res){
		req.session.cookie.originalMaxAge = 600000;
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT mun.codigo as codigo, mun.nome as nome, regiao.codigo as codigo_regiao FROM municipio mun LEFT JOIN regiao regiao ON regiao.codigo = mun.codigo_regiao WHERE mun.codigo = $1 ",
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

	router.put('/municipio/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("UPDATE municipio SET nome = ($1), codigo_regiao = ($2) WHERE codigo = $3 ",
	    		[req.body.nome, req.body.codigo_regiao, req.params.codigo], function(err, result) {
    		
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

	router.delete('/municipio/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("DELETE FROM municipio WHERE codigo = ($1) ",
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