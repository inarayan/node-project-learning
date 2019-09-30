const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function(req, res){
    
    try{
        console.log("Inside home rer" + req);
    
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path:'user'
            }
        });
    
    
        let users = await User.find({});
    
            return res.render('home', {
                title:"Codedial",
                posts:posts,
                all_users:users
            });
        //res.send('Welcome to Home Controller via router');
    }catch(err){
        console.log('error');
        return;
    }
    
}
