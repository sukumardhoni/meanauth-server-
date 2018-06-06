const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user')
const config = require('../config/databse')


module.exports = function (passport) {
    console.log('passport ' + JSON.stringify(passport))
    let opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    console.log('opts ' + JSON.stringify(opts))

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
        console.log('done ' + done)
        User.getUserById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))
}