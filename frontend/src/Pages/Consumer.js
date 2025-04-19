import React from "react";
import { useState, useEffect } from "react";
import "./Consumer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; 

const Consumer = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState([]);
  const { isAuthenticated, role } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  console.log("token", token);


  useEffect(() => {

    if (!isAuthenticated || role !== "consumer") {
      navigate("/login");
      return;
    } 


    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/farmer/products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(response.data);
        console.log("product", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, [token]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);


  const handleCategoryClick = (category)=>{
    setSelectedCategory(category);
  }

  const filterProduct = selectedCategory === "All"? products :  products.filter((product) => product.category === selectedCategory);

  const storedCart = cart;

  console.log(storedCart.length);

  return (
    <div className="-consumer-container">
      <div className="navtype-bar">
        <button className="btn-1" onClick={() => handleCategoryClick("Fruit")}>
          <img src="fruit.jpg"></img>
          <span>Fruits</span>
        </button>

        <button className="btn-1"  onClick={() => handleCategoryClick("Vegitable")}>
          <img src="vegetables.webp"></img>
          <span>Vegetable</span>
        </button>

        <button className="btn-1"  onClick={() => handleCategoryClick("Grains")}>
          <img src="grains.jpg"></img>
          <span>Grains</span>
        </button>

        <button className="btn-1"  onClick={() => handleCategoryClick("Spices")}>
          <img src="spices.jpg"></img>
          <span> Spices</span>
        </button>

        <button className="btn-1" onClick={() => handleCategoryClick("Dairy")} >
          <img src="dairy.jpg"></img>
          <span>Dairy</span>
        </button>
        <button className="btn-1" onClick={() => handleCategoryClick("Dry fruit")}>
          <img src="dryfruit.jpg"></img>
          <span>Dry Fruits </span>
        </button>

        <button className="btn-1" onClick={() => navigate("/card")}>
          <img src="cart1.png"></img>
          <p
            className="cart-count"
            style={{ display: storedCart.length > 0 ? "block" : "none" }}
          >
            {storedCart.length}
          </p>
        </button>
      </div>

      <div className="consumeritem-list">
        {filterProduct.length === 0 ? (
          <p>No products available.</p>
        ) : (
          filterProduct.map((product) => (
            <div key={product._id} className="consumer-product-card">
              <img src={`${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="consumer-product-price">Price: ₹{product.price}</p>

              
              <button
                onClick={() => addToCart(product)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
              
              
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Consumer;
