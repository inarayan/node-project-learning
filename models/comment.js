const mongooose = require('mongoose');

const CommentSchema = new mongooose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to a user
    user:{
        type:mongooose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongooose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
});

const Comment = mongooose.model('Comment', CommentSchema);

module.exports=Comment;
