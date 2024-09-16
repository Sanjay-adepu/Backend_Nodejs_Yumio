const express=require('express');
const {upload,addproducts,getproductsbyfirm,deleteProductbyid}=require('../Controller/Productcontroller');
const route=express.Router();
route.post('/addproducts/:id',upload.single('image'),addproducts);
route.get('/:id/getproducts',getproductsbyfirm)
//image uploading routing
route.get('/uploads/:imageName',async(req,res)=>{
  const imageName=req.params.imageName;
  res.headersSent('Content-Type','image/jpeg');
  res.sendFile(path.join(__dirname,'..','uploads',imageName));
  
});

route.delete('/:productid',deleteProductbyid);

module.exports=route;