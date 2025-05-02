const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        requied:true,
        unique:true
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        requied:true,
    },
    role:{
        type:String,
        default:"user"
    }
});

const User = mongoose.model("User",UserSchema);
module.exports = User;