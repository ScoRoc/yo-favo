var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', function(req, res) {
  res.send('list of all users');
});

router.get('/:id/profile', isLoggedIn, function(req, res) {
  db.user.find({
    where: {id: req.user.id}
  }).then(function(user) {
    res.render('users/show')
  });
});





module.exports = router;
