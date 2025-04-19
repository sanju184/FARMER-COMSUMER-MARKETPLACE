const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
      name:String,
      description: String,
      category:String,
      price:Number,
      image:String,
      addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"},
      
});

const Product = mongoose.model('Product', productSchema);


module.exports = Product;