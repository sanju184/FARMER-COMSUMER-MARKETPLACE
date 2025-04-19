const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); 
const dotenv = require("dotenv");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));


const createAdmin = async () => {
    try {
        
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log("Admin user already exists.");
            return;
        }

        const adminUser = new User({                
            name: "Admin",
            email: "admin@gmail.com",
            password: await bcrypt.hash("admin@123", 10),
            role: "admin",
            isVerified: true,
        });

        await adminUser.save();
        console.log("Admin user created successfully.");
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        mongoose.connection.close(); 
    }
};


createAdmin();







