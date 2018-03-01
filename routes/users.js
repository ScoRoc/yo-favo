var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', function(req, res) {
  res.send('list of all users');
});

// GET user's top games page
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

// GET user's top movies page
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

// GET user's top music page
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

// GET user's top list page
router.get('/:id/top', isLoggedIn, function(req, res) {
  db.sequelize.query('SELECT favos.id, favos.name, favos.type, favos_users.order ' +
  'FROM favos_users ' +
  'JOIN favos ON favos.id = favos_users."favoId" ' +
  'WHERE favos_users."userId" = ' + req.user.id + ' ' +
  'AND favos_users.order = ( ' +
  'SELECT MIN (favos_users.order) FROM favos_users)'
  ).then(function(topFavos) {
    console.log(topFavos);
    res.render('users/top', {topFavos: topFavos});
  });
});

// GET user's top tv page
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

// GET user's profile page
router.get('/:id/profile', isLoggedIn, function(req, res) {
  db.user.find({
    where: {id: req.user.id}
  }).then(function(user) {
    res.render('users/show', {user: user});
  });
});

// GET update user info page
router.get('/:id/update', isLoggedIn, function(req, res) {
  db.user.find({
    where: {id: req.user.id}
  }).then(function(user) {
    res.render('users/update', {user: user});
  });
});

// PUT update user info
router.put('/:id/update', function(req, res) {
  db.user.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, {
    where: {id: req.user.id}
  }).then(function(user) {
    res.send('success');
  });
});

// DELETE delete's a favo from user's top lists
router.delete('/:id/favos/:favoId', function(req, res) {
  db.favos_users.destroy({
    where: {
      userId: req.user.id,
      favoId: req.params.favoId
    }
  }).then(function(favoUser) {
      res.send('success');
  });
});










module.exports = router;
