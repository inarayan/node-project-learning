const express = require('express');
const port = 8002;
const app = express();
//first step is require
const layouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

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

