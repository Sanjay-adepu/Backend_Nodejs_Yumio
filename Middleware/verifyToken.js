const jwt = require('jsonwebtoken');
const Vendor = require('../Model/Vendor'); // Correct spelling

const secretkey = "my name is sanjay";

const verifytoken = async (req, res, next) => {
  const token = req.headers.token; // Extract token from request headers
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretkey); // Decode the token
    console.log("Decoded token:", decoded);  // Log the entire decoded payload
    console.log("Decoded vendor ID:", decoded.vendorid);  // Log the vendorid

    const vendor = await Vendor.findById(decoded.vendorid); // Find vendor by decoded vendor ID
    console.log("Vendor found:", vendor);  // Log if vendor is found

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Correctly set req.vendorid
    req.vendorid = vendor._id; // Assign vendor ID to request object
    console.log("Vendor ID set in request:", req.vendorid);

    next(); // Pass control to the next middleware/handler
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifytoken;