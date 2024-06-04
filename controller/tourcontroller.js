import Tour from '../models/Tour.js';




//Create Tour
export const createTour=async(req,res)=>{

    const newTour=new Tour(req.body)
    try{
        const savedTour=await newTour.save();
         
        res.status(200).json({success:true, message:"Successfully Created", data:savedTour});
    }
    catch(err){
        res.status(500).json({success:false, message:"Failed in Creation. Try Again"});
    }
}

//Update Tour

export const updateTour=async(req,res)=>{

    const id=req.params.id;

    try {
        const updatedTour=await Tour.findByIdAndUpdate(id,{
            $set:req.body},{new:true})
            res.status(200).json({success:true, message:"Successfully Updated", data:updatedTour})
    } catch (err) {
        res.status(500).json({success:false, message:"Failed in Updation. Try Again"});
    }

}

//Delete Tour

export const deleteTour=async(req,res)=>{

    const id=req.params.id;
    
    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Successfully Deleted"});
    } catch (err) {
        res.status(500).json({success:false, message:"Failed in Deletion. Try Again"});
    }

}


//Get Single Tour

export const getSingleTour=async(req,res)=>{

    const id=req.params.id;

    try {
        const tour=await Tour.findById(id).populate('reviews');
        res.status(200).json({success:true, message:"Successfully Retrieved", data:tour});
    } catch (err) {
        res.status(404).json({success:false, message:"Not Found"}); 
    }

}


//Get All Tour

export const getAllTours=async(req,res)=>{
    const page=parseInt(req.query.page)
    console.log(page);
    try {
        const allTours=await Tour.find({}).populate('reviews').skip(page*8).limit(8);
        res.status(200).json({success:true, count:allTours.length, message:"Successfully Retrieved", data:allTours});
    } catch (err) {
        res.status(404).json({success:false, message:"Not Found"}); 
    }

}


//get Tour by Search

export const getTourBySearch=async(req,res)=>{

    const city=new RegExp(req.query.city,'i');
    const distance=parseInt(req.query.distance);
    const maxGroupSize=parseInt(req.query.maxGroupSize);

    try{
        const tours=await Tour.find({city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}}).populate('reviews');
        res.status(200).json({success:true, message:"Successfully", data:tours});
    }catch(err){
        res.status(404).json({success:false, message:"Not Found"}); 
    }
}


//Get Featured Tour

export const getFeaturedTour=async(req,res)=>{
    
    
    try {
        const featTours=await Tour.find({featured:true}).populate('reviews').limit(8);
        res.status(200).json({success:true, count:featTours.length, message:"Successfully Retrieved", data:featTours});
    } catch (err) {
        res.status(404).json({success:false, message:"Not Found"}); 
    }

}


//Get Tour Counts

export const getTourCount=async(req,res)=>{
    try{
        const tourCount=await Tour.estimatedDocumentCount();
        res.status(200).json({success:true, data:tourCount});
    }catch(err){
        res.status(500).json({success:false, message:"Failed in Fetch. Try Again"});
    }
}