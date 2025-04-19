import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleCange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("image", product.image);

      console.log("Sending Form Data:", [...formData]);

      const response = await axios.post(
        "http://localhost:5000/api/farmer/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setProduct({
        name: "",
        description: "",
        category: "",
        price: "",
        image: null,
      });
    } catch (error) {
      console.error("error in add product ", error);
    }

    console.log("product ", product);
  };

  return (
    <div className="product-containar">
      <h2>Add product </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="enter the nome of product"
          value={product.name}
          onChange={handleCange}
        />

        <input
          type="text"
          name="category"
          placeholder="enter the category"
          value={product.category}
          onChange={handleCange}
        />

        <textarea
          name="description"
          placeholder="description"
          value={product.description}
          onChange={handleCange}
        />

        <input
          type="number"
          name="price"
          placeholder="enter the price of the product"
          value={product.price}
          onChange={handleCange}
        />

        <input type="file" name="image" onChange={handleFileChange} required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
