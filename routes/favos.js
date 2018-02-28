var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// router.get('/', function(req, res) {
//   res.send('list of all favos');
// });


///////// TESTING API BELOW \\// \\// \\// \\//

router.get('/', function(req, res) {
  var tDurl = 'https://tastedive.com/api/similar';
  var taste_data = {
    k: process.env.TASTE_DIVE_KEY,
    q: 'world of warcraft',
    limit: 5,
    info: 1
  };
  request({
    url: tDurl,
    qs: taste_data
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      // res.send({results: dataObj});
      res.render('favos/index', {results: dataObj});
    }
  });
});

////////// TESTING API ABOVE //\\  //\\  //\\  //\\



////// WORKING!!!!!!
// but maybe add recomendation???
router.get('/:name', function(req, res) {
  var tDurl = 'https://tastedive.com/api/similar';
  var taste_data = {
    k: process.env.TASTE_DIVE_KEY,
    q: req.query.search_name,
    limit: 5,
    info: 1
  };
  request({
    url: tDurl,
    qs: taste_data
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      // res.send({results: dataObj});
      res.render('favos/show', {results: dataObj});
    }
  });
});




// ~~~~~~~~~~TESTING POST ROUTE BELOW \\// \\// \\// \\//

router.post('/', function(req, res) {
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
          res.redirect('back');
      });
    });
  });
});

//~~~~~~~~~~~~ TESTING POST ROUTE ABOVE //\\ //\\ //\\ //\\






























module.exports = router;
