const express=require('express');
const VendorController=require('../Controller/VendorController');
const route=express.Router();
route.post('/signup',VendorController.venderSingup);
route.post('/login',VendorController.vendorLogin);
route.get('/allvendors',VendorController.getallvendors);
route.get('/singlevendor/:id',VendorController.getsinglevendor);
module.exports=route;