const User = require('../models/user');

module.exports.user = function(req, res){
    //A controller will tell the page name to which information needs to be rendered
    //using res.render(viewName, anyObject)
    res.render('usersProfile', {title:"A profile Page"});
}

module.exports.user_signup=function(req,res){
    res.render('userSignUp',{
        title:"CodedialSignup Page"
    });
}

module.exports.user_signin=function(req,res){
    res.render('userSignin',{
        title:"CodedialSignIn Page"
    });
}


module.exports.createUser=function(req,res){
    console.log(req.body);
    if(req.body.password != req.body.Confirm_password){
        return res.redirect('back');
    }
    //this means it is equal
    User.findOne({email:req.body.email},function(err, user){
        if(err){
            console.log('Error finding the user');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log(err);
                    console.log('Error finding the user');
                    return;
                } 
                res.redirect('/users/signin')
            })
        }
        else{
            res.redirect('/users/signin');
        }
    })
}

module.exports.createUserSession=function(req,res){
    
}