var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.get('/', function(req, res) {
  res.send('list of all users');
});

router.get('/:id/profile', function(req, res) {
  res.render('users/show')
});









module.exports = router;
