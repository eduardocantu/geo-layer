var app = function () {
  var http = require('http');
  var express = require('express');
  var app = express();
  app.set('views', __dirname + '/app');
  app.use(express.static(__dirname + '/app'));
  app.engine('html', require('ejs').renderFile);
  app.get('/', function(req, res) {
    res.render('index.html');
  });

  return app;
}();

module.exports = app;
