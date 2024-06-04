import Booking from "../models/Booking.js";

export const createBooking=async(req,res)=>{

    
    try {

        const newBooking=new Booking({...req.body});
        const savedBooking=await newBooking.save();
        
        res.status(202).json({success:true,message:"Tour Booking is Successful",data:savedBooking});

    } catch (err) {
        res.status(500).json({success:false,message:"Internal server Error"});
    }
}


//get Single Booking By Id
export const getBooking=async(req,res)=>{

    const id=req.params.id

    try {
        const book=await Booking.findById(id);
        
        res.status(202).json({success:true,message:"Successfully Fetched",data:book});

    } catch (err) {
        res.status(404).json({success:false,message:"Not Found"});
    }
}

//get All Booking By Id
export const getAllBooking=async(req,res)=>{

    try {
        const allBook=await Booking.find({});
        
        res.status(202).json({success:true,message:"Successfully Fetched",data:allBook});

    } catch (err) {
        res.status(500).json({success:false,message:"Server Error in Fetching"});
    }
}