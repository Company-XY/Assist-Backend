const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get the token from the request headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token from the "Bearer" header
      token = req.headers.authorization.split(" ")[1];
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
