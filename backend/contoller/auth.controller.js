const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async(req,res)=>{
    const {name,email,password,role}=req.body;
   
    try{

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
          }
        const existuser= await User.findOne({email});
        
        if(existuser){
           return  res.status(400).json({ message: "User already exists" });
        }


        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({name,email,password:hashedPassword,role , isVerified:role === "consumer"})
         await user.save();


         if (role === "farmer") {
          res.status(201).json({ message: "User registered successfully, waiting for verification" });
        } else {
          res.status(201).json({ message: "Register successfully" });
        }


    } catch(err){
       console.error( "error in registerd ",err);
       res.status(500).json({ message: "Server error" });
    }


}


const login = async(req,res)=>{

  try{
    const {email,password} = req.body;
       
    const user = await User.findOne({email});
    if(!user){
     return res.status(400).json({message:'invalid credentials '});

    }

    const isMatch =  await bcrypt.compare(password, user.password);
     if(!isMatch){
       return res.status(400).json({message:'wrong password '})
     }

     if(user.role === 'farmer' && !user.isVerified){
       return res.status(403).json({ message: 'Your account is pending verification' });
     }

     const token = jwt.sign(
       {id:user._id, role:user.role},
       process.env.JWT_SECRET,
       {expiresIn:'1h'}
     );

     res.json({token,role:user.role});
    
  } catch(err){
    res.status(500).json({ message: 'Server error', error: err.message });
  }
    
}


// const getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password"); 
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error("Error fetching user:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = { register,login};


