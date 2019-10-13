const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

//define options for using jwt strategy
let options = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
    
}

passport.use(new JWTStrategy(options, function(jwtPayLoad, done){
    console.log("NEW JWT strategy " + jwtPayLoad._id );
    User.findById(jwtPayLoad._id, function(err, user){
        if(err) {console.log('Error find user from JWT'); return;}


        if(user){
            console.log('### user'+ user);
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    })
}));

module.exports=passport;
