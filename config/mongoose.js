const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codeDialDevelopment');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting to Database"));

db.once('open', ()=>{
    console.log("Sucessfully connected to database");
});

module.exports = db;