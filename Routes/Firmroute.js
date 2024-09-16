const express = require('express');
const { addfirm, upload,deleteFirmbyid } = require('../Controller/Firmcontroller');
const verifytoken = require('../Middleware/verifyToken');
const route = express.Router();


route.get('/uploads/:imageName',async(req,res)=>{
  const imageName=req.params.imageName;
  res.headersSent('Content-Type','image/jpeg');
  res.sendFile(path.join(__dirname,'..','uploads',imageName));
  
});


// Apply the middleware and handler in the route
route.post('/addfirm', verifytoken, upload.single('image'), addfirm);


route.delete('/:firmid',deleteFirmbyid);

module.exports = route;