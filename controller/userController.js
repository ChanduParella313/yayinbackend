import User from '../models/User.js';




//Create User
export const createUser=async(req,res)=>{

    const newUser=new User(req.body)
    try{
        const savedUser=await newUser.save();
         
        res.status(200).json({success:true, message:"Successfully Created", data:savedUser});
    }
    catch(err){
        res.status(500).json({success:false, message:"Failed in Creation. Try Again"});
    }
}

//Update User

export const updateUser=async(req,res)=>{

    const id=req.params.id;

    try {
        const updatedUser=await User.findByIdAndUpdate(id,{
            $set:req.body},{new:true})
            res.status(200).json({success:true, message:"Successfully Updated", data:updatedUser})
    } catch (err) {
        res.status(500).json({success:false, message:"Failed in Updation. Try Again"});
    }

}

//Delete User

export const deleteUser=async(req,res)=>{

    const id=req.params.id;
    
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Successfully Deleted"});
    } catch (err) {
        res.status(500).json({success:false, message:"Failed in Deletion. Try Again"});
    }

}


//Get Single User

export const getSingleUser=async(req,res)=>{

    const id=req.params.id;

    try {
        const getUser=await User.findById(id,{ $set:req.body},{new:true});
        res.status(200).json({success:true, message:"Successfully Retrieved", data:getUser});
    } catch (err) {
        res.status(404).json({success:false, message:"Not Found"}); 
    }

}


//Get All User

export const getAllUser=async(req,res)=>{
    
    try {
        const allUsers=await User.find({});
        res.status(200).json({success:true, message:"Successfully Retrieved", data:allUsers});
    } catch (err) {
        res.status(404).json({success:false, message:"Not Found"}); 
    }

}

