var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var routes = require('./routes/index');
var doctors = require('./routes/doctors');
var patients = require('./routes/patients');
var users = require('./routes/users');
var captures = require('./routes/captures');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'bootstrap'))); 
app.use(express.static(path.join(__dirname, 'node_modules')));

app.set('trust proxy', 1); // trust first proxy


//app.use(express.static(path.join(__dirname, 'public'))); 

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
   httpOnly: false,
  secure: true,
  resave: true,
  saveUninitialized: true
}));

// addedto integrate boot strap  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
  next();
});

//  maintain sessions

app.use(function(req, res, next) {

 console.log('%s %s', req.method, req.url);
 if(req.url=='/users/login') {
	next(); 
 } else {
	if(session.user){ 
		next();
	
	} else{ 
		session.msg='expired'; 
		next();		
	} 
 } 
});


app.get('/logout', function(req, res) {
  req.session.reset();
  session.reset();
  res.redirect('/');
});
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
	console.log ('db call conf');
    next();
});

app.use('/', routes);
app.use('/doctors', doctors);
app.use('/patients', patients);
app.use('/users', users);
app.use('/captures', captures);

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;