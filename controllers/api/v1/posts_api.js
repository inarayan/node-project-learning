const Post = require('../../../models/posts');
const User = require('../../../models/user');
const Comment = require('../../../models/comment');

module.exports.display = async function(req, res){
    
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path:'user'
            }
        });
    
    
        let users = await User.find({});
    
            return res.send(200, {
                message:"This is v1 posts api",
                posts:posts
       
            })
        
    }catch(err){
        console.log(err);
        return;
    }
    
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);
        //below validation is called authorization
        console.log('#postUser ' + post.user);
        console.log('#request User ' + req.user);

        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post:req.params.id});
            //req.flash('success', 'Post deleted sucessfully');
            return res.send(200,'Post and associated comments are deleted');
        }
        else{
            console.log('Authorization failed');
            return res.send('401',{
                message:'Unauthorized request. Cannot delete the post'  
            })
        }

        //req.flash('error', 'Cannot delete this post!!')
        //return res.redirect('back');
    }

    catch(err){
        console.log('Error', err);
        //req.flash('error', err)
        res.send(500,'Error deleting the posts');
        return err;
    }
}