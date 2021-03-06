var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');


// router.get('/', function(req, res) {
//   res.send('list of all favos');
// });

// router.get('/', function(req, res) {
//   var tDurl = 'https://tastedive.com/api/similar';
//   var taste_data = {
//     k: process.env.TASTE_DIVE_KEY,
//     q: 'world of warcraft',
//     limit: 5,
//     info: 1
//   };
//   request({
//     url: tDurl,
//     qs: taste_data
//   }, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var dataObj = JSON.parse(body);
//       res.render('favos/index', {results: dataObj});
//     }
//   });
// });

////// WORKING!!!!!!
// but maybe add recomendation???
router.get('/:name', function(req, res) {
  var tDurl = 'https://tastedive.com/api/similar';
  var query = null;
  if (req.query.search_name) {
    query = req.query.search_name;
  } else {
    query = req.params.name;
  };
  var taste_data = {
    k: process.env.TASTE_DIVE_KEY,
    q: query,
    limit: 5,
    info: 1
  };
  request({
    url: tDurl,
    qs: taste_data
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.render('favos/show', {results: dataObj});
    }
  });
});

// POST adds favo to favo table
router.post('/', isLoggedIn, function(req, res) {
  db.favo.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: {
      type: req.body.type,
      wTeaser: req.body.wTeaser,
      wUrl: req.body.wUrl,
      yUrl: req.body.yUrl,
      yId: req.body.yId
    }
  }).spread(function(favos, created) {
    db.user.find({
      where: {id: req.user.id}
    }).then(function(user, created) {
      user.addFavos(favos).then(function(favos) {
        req.flash('success', 'Added favo!')
        res.redirect('back');
      });
    });
  });
});

// PUT updates order of favos on users top lists
router.put('/order', function(req, res) {
  db.favos_users.update({
    order: req.body.order,
    userId: req.user.id,
    favoId: req.body.favoId
  }, {
    where: {
      userId: req.user.id,
      favoId: req.body.favoId,
    }
  }).then(function(data) {
    res.send('success');
  })
});

module.exports = router;
