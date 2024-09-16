const mongoose=require('mongoose');
const vendorsample=new mongoose.Schema({
  username:{
    type:String,
  
  },
  gmail:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  firm:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Firm"
    
  }]
});
module.exports=mongoose.model('vendor',vendorsample);