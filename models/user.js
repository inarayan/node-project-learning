var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    } ,
    password:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true});

const User = mongoose.model('User',UserSchema);

module.exports=User;
