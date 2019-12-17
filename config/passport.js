const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const mognoose = require('mongoose')
const User = mognoose.model('User')
const keys = require('./keys.js')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jswOrDown;
module.exports = passport => {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.id).then(user => {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    }).catch(erorr => {
      console.log(erorr)
    })
  }));
}