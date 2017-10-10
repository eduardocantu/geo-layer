module.exports = function (router, pg) {
   
	router.get('/categoria_layer', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, nome FROM categoria_layer order by nome ", function(err, result) {
    		
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


	router.post('/categoria_layer', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("INSERT INTO categoria_layer(nome) values($1)",
	    		[req.body.nome], function(err, result) {
    		
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

	router.get('/categoria_layer/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, nome FROM categoria_layer WHERE codigo = $1 ",
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

	router.put('/categoria_layer/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("UPDATE categoria_layer SET nome = ($1) WHERE codigo = $2 ",
	    		[req.body.nome, req.params.codigo], function(err, result) {
    		
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

	router.delete('/categoria_layer/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("DELETE FROM categoria_layer WHERE codigo = ($1) ",
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