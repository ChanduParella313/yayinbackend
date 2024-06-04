import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




//User Registration
export const register=async(req,res)=>{
    try{
        //hashing Password
    
        const hash=bcrypt.hashSync(req.body.password,12)

        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            photo:req.body.photo,

        })
        await newUser.save();
        res.status(200).json({success:true,message:"Successfully created"});
    }
    catch(err){
        res.status(500).json({success:false,message:'Fail to create Try again'});
    }
}


//User Login
export const login=async(req,res)=>{

    const email=req.body.email

    try{
     const user=await User.findOne({email});

        //Checking For User Existence
     if(!user){
        res.status(404).json({success:false, message:"User Not Found"}); 
     }

     //If user exists then checking Password
     const checkPassword=await bcrypt.compare(req.body.password,user.password);
     if(!checkPassword){
        res.status(401).json({success:false, message:"Incorrect the Email or Password"}); 
     }

     const {password,role,...rest}=user._doc

    //  create JWT
    const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"15d"});

    //set token in Browser cookiessend the response to the client
    res
    .cookie('accessToken',token,{
        httpOnly:true,
        expiresIn:token.expiresIn
    })
    .status(202).json({
        success:true,
        message:'Successfully LoggedIn',
        token,
        data:{...rest},
        role,
    });

    }
    catch(err){
        res.status(500).json({success:false, message:"Failed to Login"}); 
    }
}