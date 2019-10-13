const user = require('../../../models/user');

const jwt = require('jsonwebtoken');

module.exports.create_session = async function(req, res){

    try{

       

        let User = await user.findOne({email:req.body.email});

        if(!User || User.password!=req.body.password){
            console.log('user not found');
            return res.send('422',{
                message:"Invalid user name and password"
            });
        }
        else{

            console.log('###### Created token');
            return res.send('200',{
                message:"User sign in successfull",
                data:{
                    token:jwt.sign(User.toJSON(), 'codeial', {expiresIn:100000})
                }
            })
        }

    }catch (err){
        console.log('************ ###'+err);
        return res.send('500',{
            message:"Internal Error occured"
        });
    }
}