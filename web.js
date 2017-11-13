//importar
var express = require('express');
//instanciar
var app = express();
var port1 = process.env.PORT || 8080;

//Archivos estaticos css, js, img, html
app.use(express.static('.'));

//ruteo
app.get('/', function(req, res){
res.sendfile(__dirname + '/index2.html');
});

//escuchar
var server = app.listen(port1, function(){

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})