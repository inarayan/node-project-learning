const express = require('express');
const port = 8002;
const app = express();

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

