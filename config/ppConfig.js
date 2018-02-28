var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var db = require('../models');

// Passport "serializes" objects to make them easy to store
// converting the user to an identifier
// the name serializeUser is based on our model...
// We could change to serializeModel or anything we have
passport.serializeUser(function(user, cb) {  // cb is a callback function
  cb(null, user.id);
});

// Paspport "deserializes" objects by taking the user's serialization id
// and looking it up in the database
passport.deserializeUser(function(id, cb) {
  db.user.findById(id).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

// Set up the local auth strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.user.findOne({
    where: {email: email}
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

module.exports = passport;
