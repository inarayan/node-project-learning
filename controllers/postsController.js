const Post = require('../models/posts');
//Create a function to save a new post to the database.
const Comment = require('../models/comment');

module.exports.create = async function(req, res){

    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
    
        });
        req.flash('success','Post Published');
        return res.redirect('back');
    }
    catch(err){
        console.log('Error saving the post');
        req.flash('error', err);
        return;
    }
    
        

        

        

    
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);
        
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post:req.params.id});
            req.flash('success', 'Post deleted sucessfully');
            return res.redirect('back');
        }

        req.flash('error', 'Cannot delete this post!!')
        return res.redirect('back');
    }

    catch(err){
        console.log('Error', err);
        req.flash('error', err)
        return err;
    }
    // Post.findById(req.params.id, function(err, post){
    //     //.id means converting the object id into string
    //     console.log(post.user);
    //     console.log(req.user.id);

    //     if(post.user == req.user.id){
    //         post.remove();
    //         Comment.deleteMany({post:req.params.id}, function(err){
    //             if(err){
    //                 console.log('Error ');
    //                 return;
    //             }
    //             return res.redirect('back');
    //         })
    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // })
}