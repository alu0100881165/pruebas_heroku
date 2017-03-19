"use strict";
let express = require('express'),
    app = express(),
    session = require('express-session');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let path = require('path');
let util = require("util");
let router = express.Router();  //rutas

//myserver_middleware.js

module.exports = router;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let bcrypt = require("bcrypt-nodejs");
let hash = bcrypt.hashSync("amyspassword");
console.log(`amypassword hashed = ${hash}`);
let users = {
  amy : hash,
  juan : bcrypt.hashSync("juanpassword"),
  antonio : bcrypt.hashSync("antoniopassword")
};


//        app.set('views', __dirname + '/views');
//        app.set('view engine', 'jade');
//        app.use(express.favicon());
//        app.use(express.logger('dev'));
app.use(bodyParser());
//        app.use(express.methodOverride());
//        app.use(express.cookieParser('your secret here'));
//        app.use(express.session());
        //app.use(app.router);
//        app.use(express.static(path.join(__dirname,'public')));


//ruteo
//app.get('/', routes.index)
//app.get('/users', user.list);

app.use(cookieParser());
app.use(session({
    secret: 'Pruebas_Carlos_David',
    resave: true,
    saveUninitialized: false
}))

app.use(function(req, res, next) {
  console.log("Cookies :  "+util.inspect(req.cookies));
  console.log("session :  "+util.inspect(req.session));
  next();
});

//MIDDLEWARE

let auth = function(req, res, next) {
  if (req.session && req.session.user in users)
    return next();
  else
    return res.sendStatus(401); // https://httpstatuses.com/401
};

app.get('/', function(req, res){
//res.sendfile(__dirname + '/gh-pages/index.html');
//console.log('peticion a la /')
        res.render('index', {title: 'index'});
});

app.get('/login', function(req, res){
        res.render('login', {title: 'login'});
});

app.get('/index', function(req, res){
        res.render('index', {title: 'index'});
});

app.get('/privada', auth, function(req, res){
        res.render('privada', {title: 'Pagina Privada'});
});

app.get('/logout', auth, function(req, res){
        delete req.session.user;
        res.redirect('/');
});

app.post('/login', function(req, res){
//      <!-- res.send("username: " + req.body.username);
        if(req.body.username in users && bcrypt.compareSync(req.body.password, users[req.body.username])){
//      if(req.body.username in users){
                req.session.user = req.body.username;
                req.session.admin = true;
                res.redirect('/privada');
        }else{
                res.send('Login incorrecto');
        }
});

//escuchar
var server = app.listen(8089, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
