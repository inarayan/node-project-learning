const Post = require('../models/posts');
//Create a function to save a new post to the database.

module.exports.create = function(req, res){
    console.log(req.user);
    Post.create({
        content:req.body.content,
        user:req.user._id

    }, function(err, post){
        if(err){
            console.log('Error saving the post');
            return;
        }

        return res.redirect('back');

    });
}