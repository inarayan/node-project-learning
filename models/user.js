var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join("/uploads/user/avatar");

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
    },
    avatar:{
        type:String
    }
},{timestamps:true});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  UserSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
  UserSchema.statics.avatarPath = AVATAR_PATH;
  
const User = mongoose.model('User',UserSchema);

module.exports=User;
