var express          = require('express'),
    path             = require('path'),
    bodyParser       = require('body-parser'),
    expressValidator = require('express-validator'),
    connection       = require('express-myconnection'),
    mysql            = require('mysql'),
    passport         = require('passport'),
    expressSession   = require('express-session'),z
    app              = express(),
    router           = express.Router(),
    cookieParser     = require('cookie-parser');
var pg = require('pg');
var config = require('./config');
global.conString = config.postgres || "postgres://postgres:1234@localhost/imap";

app.set('views','./server/views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'app')));
  app.use('/bower_components',  express.static(__dirname + '/bower_components'));
  app.use(express.static(path.join(__dirname, '/app/views')));
  app.use(express.static(path.join(__dirname, '/app/views/pages')));
  app.use(express.static(path.join(__dirname, '/app/js')));
  app.use(express.static(path.join(__dirname, '/app/styles')));
  app.use(express.static(path.join(__dirname, '/app/scripts')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(expressSession({
  secret: config.session.pass || 'imap',
  saveUninitialized: true,
  resave: true,
  cookie:{
     maxAge : config.session.time || 30000
   }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

var isAuthenticated = function (req, res, next) {
if (req.session.isLogged || req.cookies.isLogged) {
      next();
    } else {
      res.sendStatus(401);
    }
};

require("./server/routes/login")(app, pg, isAuthenticated);
app.use('/usuario\*', isAuthenticated);
require("./server/routes/usuario")(app, pg);
app.use('/protocolo\*', isAuthenticated);
require("./server/routes/protocolo")(app, pg);
//app.use('/ponto\*', isAuthenticated);
require("./server/routes/ponto")(app, pg);
app.use('/dispositivo\*', isAuthenticated);
require("./server/routes/dispositivo")(app, pg);
app.use('/regiao\*', isAuthenticated);
require("./server/routes/regiao")(app, pg);
app.use('/municipio\*', isAuthenticated);
require("./server/routes/municipio")(app, pg);
app.use('/layer\*', isAuthenticated);
require("./server/routes/layer")(app, pg);
app.use('/tipo_dispositivo\*', isAuthenticated);
require("./server/routes/tipo_dispositivo")(app, pg);
app.use('/categoria_layer\*', isAuthenticated);
require("./server/routes/categoria_layer")(app, pg);
app.use('/grupo\*', isAuthenticated);
require("./server/routes/grupo")(app, pg);
app.use('/ocorrencia\*', isAuthenticated);
require("./server/routes/ocorrencia")(app, pg);
app.use('/gamefication\*', isAuthenticated);
require("./server/routes/gamefication")(app, pg);

var server = app.listen(port = process.env.PORT || config.port || 3000, function(){
   console.log("Listening to port %s", server.address().port);
});
