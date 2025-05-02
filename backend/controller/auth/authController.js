const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const registerUser= async(req,res)=>{
    const {userName , email , password} = req.body;
    console.log(req.body, "controller")
    try {
        const user = await User.findOne({email})
        if(user){
           return res.json({
                success:false,
                message:"user already exist with this email"
            });
        }
        // agar user nahi milta toh use save krwa lo
        const hashpass = await bcrypt.hash(password , 12);
        const newUser =new User({
            userName ,
            email,
            password:hashpass
        });
        await newUser.save();
        return res.status(201).json({
            success:true,
            message :" Registration successful"
        });
    } catch (error) {
        console.log(error,"registration");
        
        return res.status(500).json({
            success:false,
            message:"some internal error occured , try again"
        });
    }
}
const loginUser = async(req,res)=>{
    const {email , password}= req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message :"this user does not exist"
            });
        }
        const ispasscorrect= await bcrypt.compare(password, user.password);
        if(!ispasscorrect){
           return res.json({
                success:false,
                message : "incorrect password"
            });
        }
        const token = jwt.sign(
            {
               id: user._id,
               userName: user.userName,
               email: user.email,
               role: user.role 
               
            },"CLIENT_SECRET_KEY",
            {expiresIn:"60m"}
        );
        res.cookie("token" , token,{httpOnly:true ,secure:false })
        .json({
            success:true,
            message:"login successfully",
            user:{
               id: user._id,
               userName: user.userName,
               email: user.email,
               role: user.role 
            }
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "internal server error"
        });
    }
}
const logOutUser= (req,res)=>{
   try {
     res.clearCookie("token");
     return res.status(200).json({
         success:true,
         message:"Logout succesfully"
     });
   } catch (error) {
    return res.json({
        success:false,
        message:"Logout failed"
    });
   }
}
const authMiddleware=async(req,res,next)=>{
    const token = req.cookies.token;
   try {
     if(!token){
        return res.json({
             success:false,
             message:"unauthorized user"
         });
     }
     const decoded =  jwt.verify(token, "CLIENT_SECRET_KEY")
     req.user =decoded
     next()
   } catch (error) {
    res.status(400).json({
        success:false,
        message:"unauthorized user"
    });
   }
}
module.exports ={registerUser ,loginUser, logOutUser ,authMiddleware}