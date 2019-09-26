const Comments = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = function(req, res){

    console.log("Inside create of commnet");

    Post.findById(req.body.post, function(err, post){

        if(post){
            Comments.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            }, function(err, comment){
                
                if(err){
                    console.log("Comment errror");
                    return ;
                }
                //adding comment to the post
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            })
        }
    })
}