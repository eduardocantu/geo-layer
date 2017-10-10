module.exports = function (router, pg) {
   
	router.get('/tipo_dispositivo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, nome FROM tipo_dispositivo order by nome ", function(err, result) {
    		
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

  router.get('/tipo_dispositivo/categoria_layer/:codigo', function(req, res){ 
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT codigo, nome FROM tipo_dispositivo where codigo_categoria_layer order by nome ", function(err, result) {
        
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


	router.post('/tipo_dispositivo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("INSERT INTO tipo_dispositivo(nome, codigo_categoria_layer) values($1, $2)",
	    		[req.body.nome, req.body.codigo_categoria_layer], function(err, result) {
    		
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

	router.get('/tipo_dispositivo/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, nome FROM tipo_dispositivo WHERE codigo = $1 ",
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

	router.put('/tipo_dispositivo/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("UPDATE tipo_dispositivo SET nome = ($1), codigo_categoria_layer = ($2) WHERE codigo = $3 ",
	    		[req.body.nome, req.body.codigo_categoria_layer, req.params.codigo], function(err, result) {
    		
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

	router.delete('/tipo_dispositivo/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("DELETE FROM tipo_dispositivo WHERE codigo = ($1) ",
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