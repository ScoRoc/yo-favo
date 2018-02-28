require('dotenv').config();
var flash = require('connect-flash');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');
var moment = require('moment');
var session = require('express-session');
var passport = require('./config/ppConfig');
var router = express.Router();
var db = require('./models');
var app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,  // make up a secret and place in .env; the string doesnt matter
  resave: false,
  saveUninitialized: true
}));

app.use(flash());  // must be after app.use(session)

app.use(passport.initialize());  // must be after app.use(session)
app.use(passport.session());  // must be after app.use(session)

app.use(function(req, res, next) {
  // before every route attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.use(function(req, res, next) {
  res.locals.moment = moment;
  next();
});

app.get('/', function(req, res) {
  res.render('landing');
});

app.use('/users', require('./routes/users'));
app.use('/favos', require('./routes/favos'));
app.use('/auth', require('./routes/auth'));
// ~~~~~~~ NEED OTHER ROUTES HERE

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
