var express = require("express");
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var jwt_decode = require('jwt-decode');
var router = express.Router();
var User = require("../models/userauth.model");
const MinecraftAPI = require('minecraft-api');

router.get('/protectedRoute',verifyToken,function(req,res){
    var decoded = jwt_decode(req.token);
    console.log(decoded);
    jwt.verify(req.token,'secret',(err,user)=>{
    
    if (err) {
        throw err;
    } else
         res.json({
            message: 'Post created',
            user,
            decoded
          });
    });
});

router.post('/checkName',function(req,res){
    console.log("Check Minecraft Name");
    console.log(req.body);
    MinecraftAPI.uuidForName(req.body.nickName)
        .then(uuid => {
            console.log("UUID");
            console.log(uuid);

            if(uuid == "undefined"){
                return res.status(200).json({"UUID": "undefined"});
            } else {
                return res.status(200).json({"UUID":uuid});
            }

        })
        .catch(err => console.log(err));
});

router.post('/getProfile',function(req,res){
    console.log("Minecraft");
    MinecraftAPI.profileForUuid('f7242cb3b50240e6ac9b2ed26d6fc786')
        .then(uuid => {
            console.log(uuid);
            console.log("UUID");

            return res.status(200).json({"Profile":uuid});

        })
        .catch(err => console.log(err));
});

//Route for Builder signup
router.post('/signup',function(req,res){
    console.log("Inside route")
    var _id= new  mongoose.Types.ObjectId();
    var name = req.body.name;
    var nickName=req.body.nickName;
    var uuid= req.body.uuid;
    var email = req.body.email;
    var password = req.body.password;

    User.create({
        _id:_id,
        name:name,
        nickName:nickName,
        uuid:uuid,
        email:email,
        password:bcrypt.hashSync(password,bcrypt.genSaltSync(10))
    },function(err,user){
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        else{
            console.log("Builder created");
            console.log()
            res.json({"msg":"Builder created successfully"});
        }
    })
})
router.post("/signin",function(req,res){
    User.findOne({email:req.body.email})
    .exec()
    .then(function(user){
        const userObj = user;

console.log(user);
console.log(typeof user);

        if(user == null){
            return res.status(500).json({
                failure:"Builder not here."

            });
        } else {
            bcrypt.compare(req.body.password,user.password, function(err,user){

                if(err){
                    return res.status(401).json({
                        failed: 'Unauthorized Access'    
                    });
                }

                if(user){
                    
                    const JWTtoken = jwt.sign(
                                                {
                                                    email: user.email,
                                                    _id: user._id
                                                },
                                                'secret',
                                                {
                                                    expiresIn: '2h'
                                                }
                                            );

                    return res.status(200).json({
                        token: JWTtoken,
                        email: userObj.email,
                        name: userObj.nickName
                    });
                    
                }
                return res.status(500).json({
                    failure:"User not verified!!"

                });

            });
        }

    })
    .catch((err) => console.log(err));

})

//Token Format
//Authorization:Bearer<account_token>
//Verify Token
//It is a middleware function therfore it calls the next to proceed
function verifyToken(req,res,next)
{
	const bearerHeader = req.headers['authorization'];
		if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            //set the token
            req.token=bearerToken;
            //Next middleware
            next();


		}
		else
		{
			//forbidden
			res.sendStatus(403);
		}

}

module.exports=router;