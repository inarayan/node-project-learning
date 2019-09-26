const Post = require('../models/posts');
//Create a function to save a new post to the database.
const Comment = require('../models/comment');

module.exports.create = function(req, res){

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

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        //.id means converting the object id into string
        console.log(post.user);
        console.log(req.user.id);

        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id}, function(err){
                if(err){
                    console.log('Error ');
                    return;
                }
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}