const Post = require('../models/posts');

module.exports.home = function(req, res){
    

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path:'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log("populate the user and post details on home page");
            return;

        }
        console.log("Retreiving post" +posts);
        return res.render('home', {
            "title":"Codedial",
            "posts":posts
        })

    })
    //res.send('Welcome to Home Controller via router');
   
}