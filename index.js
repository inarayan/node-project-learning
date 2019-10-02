const express = require('express');
const port = 8002;
const app = express();
//first step is require
const layouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const reqBodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const passportLocal = require('./config/passport-local-strategy');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');

app.use(session({
    name:'codeial',
    secret:'mysecretKey',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection:db
    })

}))
//Passport intialization should happen only after session has been configured and not before that .
app.use(passport.initialize());
app.use(passport.session());

//call the setAuthenticated user to set the user details in case it is available
app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMWare.setFlash);

app.use(express.static('./assets'));
app.use(reqBodyParser.urlencoded({extended:true}));

app.use(layouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use('/', require('./routers/index'));

app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err)
    console.log('Error starting the server!!')
    else{
        console.log(`Server started on port :${port}`);
    }
});

