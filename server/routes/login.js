module.exports = function (router, pg, isAuthenticated) {

	var buscarGrupos = function(conn, codigo_usuario, callback) {
    	var query = conn.query("SELECT codigo_grupo FROM usuario_grupo WHERE codigo_usuario = $1 ",
    		[codigo_usuario], function(err, result) {
			var results,
				codigos = [];

			if(err) {
  				return callback();
			}
			results = result.rows;
            if(results.length > 0){
            	for(i = 0; i < results.length; i++) { 
            		codigos.push(results[i].codigo_grupo);
    			}
            	return callback(codigos);
    		}
    		return callback();
		});		
	};


	router.post('/login', function(req, res){
		pg.connect(global.conString, function(err, conn, done){
	    	if (err) return console.error('error connect db', err);
	    	var query = conn.query("SELECT codigo, tipo FROM usuario WHERE email = $1 and senha = $2 ",
	    		[req.body.email, req.body.senha], function(err, result) {
    			var results;

    			done();

    			if(err) {
    				res.sendStatus(400);
            		conn.end();
      				return console.error('error running query', err);
    			}

				results = result.rows;
	            if(results.length > 0){
	            	res.cookie('codigo_usuario', results[0].codigo, {maxAge: 900000, httpOnly: true});
	            	res.cookie('permissao', results[0].tipo, {maxAge: 900000, httpOnly: true});
	            	res.cookie('isLogged', true, {maxAge: 900000, httpOnly: true});
		   			req.session.isLogged = true;
		   			req.session.permissao = results[0].tipo;
		   			req.session.codigo_usuario = results[0].codigo;
		   			req.session.hash = req.session.email + req.session.senha;
	        		buscarGrupos(conn, results[0].codigo, function(codigo_grupos){
	        			res.cookie('grupos', codigo_grupos, {maxAge: 900000, httpOnly: true});
	        			req.session.grupos = codigo_grupos;
	            		res.json(results[0].tipo);
	            	});
	    		} else {
	        		res.sendStatus(401);
	    		}
  			});
		});
	});

	router.get('/isLogged', isAuthenticated, function(req, res, next){	
		res.sendStatus(200);
	});

	router.get('/logout', isAuthenticated, function(req, res) {
		req.logout();
	  	req.session.destroy();
	  	res.clearCookie('grupos');
	  	res.clearCookie('isLogged');
	  	res.clearCookie('codigo_usuario');
	  	res.sendStatus(200);
	});

};