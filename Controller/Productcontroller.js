const Product=require('../Model/Product');
const Firm=require('../Model/Firm');
const multer=require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  }
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});


const addproducts=async(req,res)=>{
  const {productname,price,category,bestseller,description}=req.body;
  
  const image = req.file ? req.file.filename : undefined; // Check if file was uploaded
  try{
    const firmid=req.params.id;
    const firm=await Firm.findById(firmid);
    if(!firm){
      console.log("firm is not assigned")
    }
    const Products=new Product({
      productname,price,category,bestseller,description,
      firm:firm._id
    });
    if(!Products){
      console.log("error occured because of not added products")
    }
  const data=  await Products.save();
  firm.products.push(data._id);
  await firm.save();
    res.status(201).json({Products})
  }catch(error){
    console.log(error,"error occured at products adding stage");
  }
}
//getting products from firm based on firm id

const getproductsbyfirm=async(req,res)=>{
  try{
    const firmid=req.params.id;
    const firm=await Firm.findById(firmid);
    if(!firm){
      console.log("firm is not found at getting products");
    }
      const products=await Product.find({firm:firmid});
    if(!products){
      console.log("error occured at products getting process");
    }
      res.status(201).json({products});
    }catch(error){
      console.log(error);
    }
  }
  // delete products by id
  const deleteProductbyid=async(req,res)=>{
    try{
    const productid=req.params.productid;
    const deletedproduct=await Product.findByIdAndDelete(productid);
    if(!deletedproduct){
      return res.status(404).json({message:"No product is found"})
    }
  }catch(error){
    console.error(error);
  }
  }
module.exports={
  addproducts,
  upload,
  getproductsbyfirm,
  deleteProductbyid
  
}