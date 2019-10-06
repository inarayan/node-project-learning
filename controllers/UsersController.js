const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    //A controller will tell the page name to which information needs to be rendered
    //using res.render(viewName, anyObject)
    console.log('inside profile page');
    if(req.params.id){
        User.findById(req.params.id, function(err, user){
            return res.render('usersProfile',
             {title:"A profile Page",
             profile_user:user
                });
        })
    }
   
    
}

module.exports.update = async function(req, res){
    //A controller will tell the page name to which information needs to be rendered
    //using res.render(viewName, anyObject)
    // console.log('inside update page');
    
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     })
    // }
    // else{
    //     res.status(401).send('Unauthorized');
    // }
   
    if(req.user.id == req.params.id){

        try{
           
            let user = await User.findById(req.params.id);
            
            
            User.uploadedAvatar(req, res, function(err){
                
                if(err){
                    console.log('********Multer Error');
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                    }
                    user.avatar = User.avatarPath+"/"+req.file.filename;
                }
                
                user.save();
                return res.redirect('back');
            })

        }catch(error){
            req.flash('error', error);
            res.redirect('back');

        }
    }
    else{
        req.flash('error','UnAuthorized');
        res.status(401).send('Unauthorized');
    }
    
}

module.exports.user_signup=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    else{
        res.render('userSignUp',{
            title:"CodedialSignup Page"
        });
    }
    
}

module.exports.user_signin=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    else{
        res.render('userSignin',{
            title:"CodedialSignIn Page"
        });
    }
    
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
    console.log("inside create ser session");
    req.flash('success', 'logeed in sucessfully');

    res.redirect('/');
}

module.exports.destroySession=function(req,res){
 req.logout();
 req.flash('success', 'logeed out sucessfully');
    res.redirect('/');
}