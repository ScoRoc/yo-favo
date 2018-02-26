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

// init SESSION
// init FLASH
// init PASSPORT

app.use(function(req, res, next) {
  res.locals.moment = moment;
  next();
});

app.get('/', function(req, res) {
  res.send('working');
});

// app.use('/auth', require('./routes/auth'));
// ~~~~~~~ NEED OTHER ROUTES HERE

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
