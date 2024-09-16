const Firm = require('../Model/Firm');
const Vendor = require('../Model/Vendor'); // Import the correct model
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Set up the storage engine for multer
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

// Add firm function
const addfirm = async (req, res) => {
  const { firmname, area, category, region, offer } = req.body; // Check if the key matches request
  const image = req.file ? req.file.filename : undefined; // Check if file was uploaded
  const vendorid=req.vendorid;
  // Log to verify the data from the request
  console.log("Received request to add firm");
  console.log("Body content:", req.body); // Check what's being sent in the request
  console.log("Vendor ID:", vendorid); // Check if vendorId is being passed correctly

  // Validate vendorId format
  if (!mongoose.Types.ObjectId.isValid(vendorid)) {
    return res.status(400).json({ message: 'Invalid vendor ID format' });
  }

  try {
    // Find the vendor by ID
    const vendor = await Vendor.findById(vendorid);
    console.log("Vendor search result:", vendor); // Log what vendor is found
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Create a new firm object
    const firmData = new Firm({
      firmname,
      area,
      category,
      region,
      offer,
      image,
      vender: vendorid // Associate the firm with the vendor
    });

    // Save the firm data
    const firmform = await firmData.save();

    // Push the newly created firm into the vendor's firm array
    vendor.firm.push(firmform._id); // Use the firm ID
    await vendor.save(); // Save the vendor with the new firm

    return res.status(201).json(firmform);
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ message: 'Server Error', error });
  }

};
// delete firms by id
  const deleteFirmbyid=async(req,res)=>{
    try{
    const firmid=req.params.firmid;
    const deletedfirm=await Firm.findByIdAndDelete(firmid);
    if(!deletedfirm){
      return res.status(404).json({message:"No firm is found"})
    }
  }catch(error){
    console.error(error);
  }
  }

module.exports = {
  addfirm,
  upload,
  deleteFirmbyid
};