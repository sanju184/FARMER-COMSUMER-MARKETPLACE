const jwt = require("jsonwebtoken");
const User = require('../models/User');


const authMiddleware = (req,res,next)=>{
      const token =  req.header('Authorization')&& req.header('Authorization').split(' ')[1];

        console.log("token foe authorization", token);
       
      if(!token){
        return res.status(401).json({ message: "Access Denied token not" });
      }

      try{
        const verified = jwt.verify(token,process.env.JWT_SECRET);

       
           req.user = verified;
        
        next();

      }catch(error){
        res.status(400).json({ message: "Invalid Token" });
      }
}

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied: Admins Only" });
    }
    next();
};


const farmerMiddleware = (req,res,next )=>{
  if(req.user.role == 'farmer' || req.user.role == "consumer"){
    return next();
  }
  res.status(403).json({ message: "Access Denied: farmer  Only" });
  
}

// const consumerMiddleware = (req,res,next )=>{

//   console.log("role",req.user.role);
//   if(req.user.role !== 'consumer'){
//     return res.status(403).json({ message: "Access Denied: farmer  Only" });
//   }

//   next();
// }

module.exports = { authMiddleware, adminMiddleware,farmerMiddleware};