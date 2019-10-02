const passport = require('passport');

const localstrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new localstrategy({
    usernameField:'email',
    passReqToCallback:true
},function(req, email,passwod, done){
    console.log("inside passport");
    User.findOne({email:email}, function(err, user){
        if(err){
            req.flash('error', 'User not found');
            console.log('Error in finding user');
            done(error);
        }
        if(!user || passwod!=user.password){
            console.log('invalid username');
            req.flash('error', 'Invalid username/password');
            console.log('Invalid user name/password');
            return done(null, false);
        }
        console.log(user);

        return done(null, user);

    })
}));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    console.log("inside serializer")
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        //user is signed in
        return next();
    }else{
        //user is not signed
        return res.redirect('/users/signin');
    }
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //request user contains current signed in user.
        res.locals.user = req.user;
    }
    next();

}

