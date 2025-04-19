const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const imageUrl = req.file.path;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: imageUrl,
      farmerId: req.user.id,
    });

    await newProduct.save();
    res.status(200).json({ message: "product added successfully " });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const showProduct = async (req, res) => {
  try {
    const product = await Product.find().lean();

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const deletProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "remove item" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting farmer" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, category, description, price } = req.body;
  const image = req.file;

  try {
    const updateData = {
      name,
      category,
      description,
      price,
    };

    if (image) {
      updateData.image = image.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addProduct, showProduct, deletProduct, updateProduct };
