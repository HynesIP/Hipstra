var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

var signupSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category:{
        type:String,
        required:true
    },
    article:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    coords:{
        type:String,
        required:true
    },
    uuid:{
        type:String,
        required:false
    }

});
var Bequests = mongoose.model('Bequests',signupSchema);
module.exports=Bequests;