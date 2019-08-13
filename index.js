const express = require('express');
const port = 8002;
const app = express();

app.listen(port, function(err){
    if(err)
    console.log('Error starting the server!!')
    else{
        console.log(`Server started on port :${port}`);
    }
});

