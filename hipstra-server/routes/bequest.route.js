var express = require("express");
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var jwt_decode = require('jwt-decode');
var router = express.Router();
var Bequest = require("../models/bequest.model");

//Route for Builder request
router.post('/bequest',function(req,res){
    console.log("Bequest route")
    var _id= new  mongoose.Types.ObjectId();
    var category = req.body.category;
    var article=req.body.article;
    var description= req.body.description;
    var uuid= req.body.uuid;
    var coords= req.body.coords;

    Bequest.create({
        _id:_id,
        category:category,
        article:article,
        description:description,
        uuid:uuid,
        coords:coords
    },function(err,user){
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        else{
            console.log("Request submitted.");
            res.json({"msg":"Request submitted successfully."});
        }
    })
})
module.exports=router;