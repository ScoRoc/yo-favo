var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', function(req, res) {
  res.send('list of all users');
});

router.get('/:id/games', function(req, res) {
  db.user.find({
    where: {id: req.user.id},
    include: [db.favo]
  }).then(function(user) {
    res.render('users/games', {user: user});
  });
});

router.get('/:id/movies', function(req, res) {
  db.user.find({
    where: {id: req.user.id},
    include: [db.favo]
  }).then(function(user) {
    res.render('users/movies', {user: user});
  });
});

router.get('/:id/music', function(req, res) {
  db.user.find({
    where: {id: req.user.id},
    include: [db.favo]
  }).then(function(user) {
    res.render('users/music', {user: user});
  });
});

router.get('/:id/top', function(req, res) {
  db.user.find({
    where: {id: req.user.id},
    include: [db.favo]
  }).then(function(user) {
    res.render('users/top', {user: user});
  });
});

router.get('/:id/tv', function(req, res) {
  db.user.find({
    where: {id: req.user.id},
    include: [db.favo]
  }).then(function(user) {
    res.render('users/tv', {user: user});
  });
});

router.get('/:id/profile', isLoggedIn, function(req, res) {
  db.user.find({
    where: {id: req.user.id}
  }).then(function(user) {
    res.render('users/show', {user: user});
  });
});





module.exports = router;
