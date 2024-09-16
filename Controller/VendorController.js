const Vendor=require('../Model/Vendor');
const jsonweb=require('jsonwebtoken');
const venderSingup=async(req,res)=>{
  const{username,gmail,password}=req.body;
  try{
    const data=new Vendor({
      username,
      gmail,
      password
    })
   await data.save();
   res.status(201).json({massege:"data stored successfully"});
   
}
catch(error){
  console.error(error);
  res.status(501).json(error);
}
}
const vendorLogin=async(req,res)=>{
  const secretKey="my name is sanjay";
  const{gmail,password}=req.body;
  
  try{
    const vendor=await Vendor.findOne({gmail});
    if(!vendor){
    console.log("user details not found");
    }
    const token=jsonweb.sign({vendorid:vendor._id},secretKey,{expiresIn:"1h"});
    res.status(201).json({element:"login successful",token});
    console.log(token);
    
  }
  catch(error){
    console.error(error);
    res.status(501).json({error:"error occured"})
  }
    
}
//getting all vendor records 
const getallvendors=async(req,res)=>{
    try{
    const allvendors=await Vendor.find().populate('firm');
    
    res.status(201).json({allvendors});
    }
    catch(error){
      console.log("error ocuured at getfirm",error);
      res.status(501).json({error:"error occured at getfirm"})
    }
  };
  
  //getting single vendor record 
  const getsinglevendor=async(req,res)=>{
    try{
      const vendorid=req.params.id;
      if(!vendorid){
        console.log('vendor id is requires in this single vendor');
      }
      const singlevendor=await Vendor.findById(vendorid).populate('firm');
      if(!singlevendor){
        console.log('vendor details are not found');
      }
      res.status(201).json({singlevendor});
    }
  catch(error){
    console.log("error occtured at this getting single record");
    
  }
  };

module.exports={venderSingup,
                 vendorLogin,
                 getallvendors,
                getsinglevendor
};

