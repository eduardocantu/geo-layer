module.exports = function (router, pg) {

	router.get('/layer', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, nome, descricao, codigo_grupo, formato, cor, tipo, codigo_categoria_layer FROM layer order by nome", function(err, result) {
    		
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


	router.post('/layer', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("INSERT INTO layer(nome, descricao, codigo_grupo, formato, cor, tipo, codigo_categoria_layer) values($1, $2, $3, $4, $5, $6, $7) RETURNING *",
	    		[req.body.nome, req.body.descricao, req.cookies.codigo_usuario, req.body.formato, req.body.cor, req.body.tipo, req.body.codigo_categoria_layer], function(err, result) {
    		
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

  router.get('/layer/grupo/:codigo', function(req, res){
    req.session.cookie.originalMaxAge = 600000;
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT codigo, nome, descricao, codigo_grupo, formato, cor, tipo, codigo_categoria_layer FROM layer WHERE codigo_grupo = $1 order by nome ",
          [req.params.codigo], function(err, result) {
        
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

	router.get('/layer/:codigo', function(req, res){
		req.session.cookie.originalMaxAge = 600000;
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, nome, descricao, codigo_grupo, formato, cor, tipo, codigo_categoria_layer FROM layer WHERE codigo = $1 ",
	    		[req.params.codigo], function(err, result) {
    		
    			done();

    			if(err) {
    				res.sendStatus(400);
            conn.end();
      				return console.error('error running query', err);
    			}
    			//conn.end();
          return res.json(result);
  			});
		});
	});

	router.put('/layer/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("UPDATE layer SET nome = ($1), descricao = ($2), formato = ($3), cor = ($4), tipo = ($5), codigo_categoria_layer = ($6), codigo_grupo = ($7) WHERE codigo = $8 and codigo_grupo = $9 ",
	    		[req.body.nome, req.body.descricao, req.body.formato, req.body.cor, req.body.tipo, req.body.codigo_categoria_layer, req.body.codigo_grupo, req.params.codigo, req.cookies.codigo_usuario], function(err, result) {
    		
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

	router.delete('/layer/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("DELETE FROM layer WHERE codigo = ($1) ",
	    		[req.params.codigo], function(err, result) {
    		
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
};