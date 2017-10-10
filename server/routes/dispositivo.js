module.exports = function (router, pg) {
  
	router.get('/dispositivo/layer/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("SELECT codigo, descricao, endereco, coordenada, status, status_data, data FROM dispositivo WHERE codigo_layer = ($1) "
          + " AND data BETWEEN ($2) AND ($3)", [req.params.codigo, req.query.data_inicio, req.query.data_fim],
         function(err, result) {
    		
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

  router.get('/dispositivo', function(req, res){  
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT codigo, codigo_layer, descricao, endereco, coordenada, status, status_data, data FROM dispositivo order by codigo ",
         function(err, result) {
        
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

  router.get('/dispositivo/:codigo', function(req, res){  
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT codigo, codigo_layer, descricao, endereco, coordenada, status, status_data, data FROM dispositivo WHERE codigo = ($1) ",
          [req.params.codigo],
         function(err, result) {
        
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

	router.post('/dispositivo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("INSERT INTO dispositivo(descricao, endereco, coordenada, codigo_layer, status, status_data)" +
          " values($1, $2, $3, $4, 'NORMAL',  NOW())",
	    		[req.body.descricao, req.body.endereco, req.body.coordenada, req.body.codigo_layer], function(err, result) {
    		
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

	router.put('/dispositivo/:codigo', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("UPDATE dispositivo SET descricao = ($1), coordenada = ($2), status = ($3), status_data = ($4), " +
          " data = ($5), codigo_layer = ($6), endereco = ($7) WHERE codigo = $8 ",
	    		[req.body.descricao, req.body.coordenada, req.body.status, req.body.status_data, req.body.data, req.body.codigo_layer, req.body.endereco, req.params.codigo], function(err, result) {
    	
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

  router.put('/dispositivo/:codigo/alerta', function(req, res){  
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE dispositivo SET descricao = ($1), status = ($2), status_data = (NOW()), " +
          " WHERE codigo = $3 ",
          [req.body.descricao, 'ALERTA', req.params.codigo], function(err, result) {
      
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

  router.put('/dispositivo/:codigo/normal', function(req, res){  
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE dispositivo SET descricao = ($1), status = ($2), status_data = (NOW()), " +
          " WHERE codigo = $3 ",
          [req.body.descricao, 'NORMAL', req.params.codigo], function(err, result) {
      
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


	router.delete('/dispositivo/:codigo', function(req, res){
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("DELETE FROM dispositivo WHERE codigo = ($1) ",
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