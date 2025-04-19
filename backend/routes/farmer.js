const express = require("express");
const multer = require("multer");
const {addProduct,showProduct,deletProduct ,updateProduct}= require("../contoller/farmer.controller")
const router = express.Router();
const { authMiddleware, farmerMiddleware} = require("../middleware/authmiddleware");
const cloudinary = require('cloudinary').v2;

const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Untitled", 
        format: async (req, file) => "png", 
        public_id: (req, file) => Date.now() + "-" + file.originalname,
    },
    error: (err, req, res, next) => {
        console.error("Cloudinary error:", err);
        return res.status(500).json({ message: "Cloudinary upload failed", error: err.message });
    },
});

const upload = multer({ storage:storage });

// const storage = multer.diskStorage({
//     destination:(req,file,cd) =>{
//         cd(null,'uploads/');
//     },
//     filename:(req,file,cd) =>{
//         cd(null,Date.now()+ "-" + file.originalname);
//     }

// });

// const upload = multer({storage});

router.post("/add",upload.single("image"),farmerMiddleware, addProduct);
router.get("/products",authMiddleware,farmerMiddleware ,showProduct);
router.delete("/delete/:id",authMiddleware,farmerMiddleware, deletProduct);
router.put("/update/:id",upload.single("image"),authMiddleware,farmerMiddleware, updateProduct);






module.exports = router;

