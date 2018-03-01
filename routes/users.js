var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', function(req, res) {
  res.send('list of all users');
});

router.get('/:id/games', isLoggedIn, function(req, res) {
  db.sequelize.query('SELECT favos.id, favos.name, favos.type, favos."wTeaser", favos."wUrl", favos."yUrl", favos_users.order ' +
    'FROM favos_users ' +
    'JOIN favos ON favos.id = favos_users."favoId" ' +
    'WHERE favos_users."userId" = ' + req.user.id +
    'ORDER BY favos_users.order', { type: db.sequelize.QueryTypes.SELECT})
  .then(function(favos) {
    res.render('users/games', {favos: favos});
  });
});

router.get('/:id/movies', isLoggedIn, function(req, res) {
  db.sequelize.query('SELECT favos.id, favos.name, favos.type, favos."wTeaser", favos."wUrl", favos."yUrl", favos_users.order ' +
    'FROM favos_users ' +
    'JOIN favos ON favos.id = favos_users."favoId" ' +
    'WHERE favos_users."userId" = ' + req.user.id +
    'ORDER BY favos_users.order', { type: db.sequelize.QueryTypes.SELECT})
  .then(function(favos) {
    res.render('users/movies', {favos: favos});
  });
});

router.get('/:id/music', isLoggedIn, function(req, res) {
  db.sequelize.query('SELECT favos.id, favos.name, favos.type, favos."wTeaser", favos."wUrl", favos."yUrl", favos_users.order ' +
    'FROM favos_users ' +
    'JOIN favos ON favos.id = favos_users."favoId" ' +
    'WHERE favos_users."userId" = ' + req.user.id +
    'ORDER BY favos_users.order', { type: db.sequelize.QueryTypes.SELECT})
  .then(function(favos) {
    res.render('users/music', {favos: favos});
  });
});

router.get('/:id/top', isLoggedIn, function(req, res) {
  db.user.find({
    where: {id: req.user.id},
    include: [db.favo]
  }).then(function(user) {
    res.render('users/top', {user: user});
  });
});

router.get('/:id/tv', isLoggedIn, function(req, res) {
  db.sequelize.query('SELECT favos.id, favos.name, favos.type, favos."wTeaser", favos."wUrl", favos."yUrl", favos_users.order ' +
    'FROM favos_users ' +
    'JOIN favos ON favos.id = favos_users."favoId" ' +
    'WHERE favos_users."userId" = ' + req.user.id +
    'ORDER BY favos_users.order', { type: db.sequelize.QueryTypes.SELECT})
  .then(function(favos) {
    console.log(favos);
    res.render('users/tv', {favos: favos});
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
