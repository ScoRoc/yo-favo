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
      res.send({results: dataObj});
      res.render('favos/index', {results: dataObj});
    }
  });
});


router.get('/:id', function(req, res) {
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
      res.render('favos/show', {results: dataObj});
    }
  });
});

////////// TESTING API ABOVE ^^^^^^^^




module.exports = router;
