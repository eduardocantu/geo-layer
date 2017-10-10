module.exports = function (router, pg) {

	router.post('/gamefication', function(req, res){	
		pg.connect(global.conString, function(err,conn, done){

	    	if (err) return next("Cannot Connect");

	    	var query = conn.query("INSERT INTO gamefication(valor, codigo_usuario, codigo_ponto)" +
          " values($1, $2, $3) RETURNING *",
	    		[req.body.valor, req.cookies.codigo_usuario, req.body.codigo_ponto], function(err, result) {
    		
    			done();

    			if(err) {
    				res.sendStatus(400);
      		  return console.error('error running query', err);
    			}
    			conn.end();
          var retorno = {
            codigo: zeroFill(result.rows[0].codigo),
            descricao: "Ocorrência efetuada com sucesso!"
          };
          return res.json(retorno);
  			});
		});
	});

  router.get('/gamefication/total', function(req, res){
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT sum (valor) total FROM gamefication WHERE codigo_usuario = $1 ", [req.cookies.codigo_usuario], function(err, result) {
        
          done();

          if(err) {
            res.sendStatus(400);
            conn.end();
            return console.error('error running query', err);
          }
          result.rows[0].codigo = req.cookies.codigo_usuario;
          return res.json(result);
        });
    });
  });

  router.get('/gamefication/ranking', function(req, res){
    pg.connect(global.conString, function(err,conn, done){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT codigo_usuario, usuario.nome, usuario.email, sum (valor) total FROM gamefication join usuario on usuario.codigo = codigo_usuario group by codigo_usuario, usuario.nome, usuario.email order by total desc ", function(err, result) {
        
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