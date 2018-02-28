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
      res.send({results: dataObj});
      // res.render('favos/show', {results: dataObj});
    }
  });
});

////////// TESTING API ABOVE ^^^^^^^^



///////// TESTING POST ROUTE BELOW \\// \\// \\// \\//


// POST /posts - create a new post
// router.post('/', function(req, res) {
//   // Change my comma-separated tags into an array of tagss
//   var tags = [];
//   if (req.body.tags) {
//     tags = req.body.tags.split(',');
//   }
//   db.post.create({
//     title: req.body.title,
//     content: req.body.content,
//     authorId: req.body.authorId
//   })
//   .then(function(post) {
//     // Handle adding the tags if there are any
//     if (tags.length > 0) {
//       // Add some tags
//       // Make a loop through the tag array
//       async.forEach(tags, function(t, callback) {
//         // This is the iterator function
//         // Add the tag to the tags table
//         db.tag.findOrCreate({
//           where: {name: t.trim()}
//         }).spread(function(newTag, wasCreated) {
//           // Add the relationship between the post and the tag in the posts_tags table
//           post.addTag(newTag).then(function() {
//             callback();  // This says that it's done!
//           })
//         });
//       }, function() {
//         // This is the function that runs when everything is resolved/done
//         // Redirect to post page
//         res.redirect('/posts/' + post.id);
//       });
//     } else {
//       // No tags to add just redirect to post page
//       res.redirect('/posts/' + post.id);
//     }
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });


////////// TESTING POST ROUTE ABOVE ^^^^^^^^







module.exports = router;
