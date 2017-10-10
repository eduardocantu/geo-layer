module.exports = function (router, pg) {

	router.post('/grupo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("INSERT INTO grupo(nome, descricao) values($1, $2) RETURNING *",
	    		[req.body.nome, req.body.descricao, req.cookies.codigo_usuario], function(err, result) {
    		
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

	router.get('/grupo', function(req, res){
		pg.connect(global.conString, function(err, conn, done){
	    	if (err) return next("Cannot Connect");

        var idsGrupo = null;

        if (req.cookies.grupos instanceof Array) {
          idsGrupo = req.cookies.grupos.join(',').toString();
        }

	    	var query = conn.query("SELECT codigo, nome, descricao FROM grupo WHERE codigo in ("
            + idsGrupo +
          ") order by nome ", function(err, result) {
      		
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

  router.get('/grupo/:codigo', function(req, res){
    req.session.cookie.originalMaxAge = 600000;
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT codigo, nome, descricao FROM grupo WHERE codigo = $1 order by nome ",
          [req.params.codigo], function(err, result) {
        
          //call `done()` to release the client back to the pool
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


	router.put('/grupo/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");
        
	    	var query = conn.query("UPDATE grupo SET nome = ($1), descricao = ($2) WHERE codigo = $3",
	    		[req.body.nome, req.body.descricao, req.params.codigo], function(err, result) {
    		
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

	router.delete('/grupo/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("DELETE FROM grupo WHERE codigo = ($1)",
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