const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const adminRoutes = require('./routes/admin');
const farmerRoutes = require('./routes/farmer');
  
dotenv.config();

const app =express();

app.use(cors());
app.use(express.json());


app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/farmer',farmerRoutes);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


mongoose.connect(process.env.MONGO_URL ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));
  

  

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=> console.log(`Server running on port ${PORT}`))