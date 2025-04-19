import "./Home.css";
import React, { useRef } from "react";
import tometo from "../assets/tometo.webp"; 
import rice  from "../assets/rice.webp"; 
import milk from "../assets/milk.webp"; 
import apple from "../assets/apple.webp"; 
import carrot from "../assets/carrot.webp"; 
import poteto from "../assets/poteto.webp"; 
import farmImage from "../assets/background.webp"
import { HiArrowCircleRight } from "react-icons/hi";

import { HiArrowCircleLeft } from "react-icons/hi";

import marketImage from "../assets/market.webp"; 

const Home = ()=>{

    const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };


    const products = [
        { img: tometo, name: "Tomatoes", desc: "Fresh organic tomatoes" },
        { img: rice, name: "Organic Rice", desc: "Pure and healthy rice" },
        { img: milk, name: "Fresh Milk", desc: "Farm fresh and nutritious" },
        { img: carrot, name: "Carrots", desc: "Crisp and fresh carrots" },
        { img: apple, name: "Apples", desc: "Sweet and juicy apples" },
        { img: poteto, name: "Potatoes", desc: "Natural and fresh potatoes" },
        { img: apple, name: "Apples", desc: "Sweet and juicy apples" },
        { img: rice, name: "Organic Rice", desc: "Pure and healthy rice" },
        { img: carrot, name: "Carrots", desc: "Crisp and fresh carrots" },
        { img: tometo, name: "Tomatoes", desc: "Fresh organic tomatoes" },
        { img: milk, name: "Fresh Milk", desc: "Farm fresh and nutritious" },
        { img: apple, name: "Apples", desc: "Sweet and juicy apples" },
        { img: rice, name: "Organic Rice", desc: "Pure and healthy rice" },

      
    ];

       
       return (
        <div className="home">
        <div className="hero"  style={{ backgroundImage: `url(${farmImage})` }}  >
            
            <h1>Welcome to Farmer Marketplace</h1>
            <p>Buy fresh, organic, and locally sourced products directly from farmers.</p>
        </div>

        <section className="products">
            <h2>Our Fresh Products</h2>
            <button className="scroll-btn left"  onClick={scrollLeft}><HiArrowCircleLeft />
            </button>
            <div className="product-list"  ref={sliderRef}>
                {products.map((product,index )=>(
                    <div className="product " key={index }>
                        <img src={product.img} alt={product.name}/>
                        <h3>{product.name}</h3>
                        <p>{product.desc}</p>
                    </div> 
                ))}
            </div>
            <button className="scroll-btn right" onClick={scrollRight}><HiArrowCircleRight /></button>
        </section>

        <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <span className="icon">🏆</span>
            <p>Best Quality Products</p>
          </div>
          <div className="feature">
            <span className="icon">🚚</span>
            <p>Fast & Free Delivery</p>
          </div>
          <div className="feature">
            <span className="icon">🌿</span>
            <p>100% Organic & Natural</p>
          </div>
        </div>
      </section>

       
        <section className="about">
            <div className="about-content">
                <img src={marketImage} alt="Farmer's Market" />
                <div>
                    <h2>About Us</h2>
                    <p>
                        Farmer Marketplace connects farmers with consumers directly, 
                        ensuring fresh produce, fair prices, and a transparent food system. 
                        Support local farmers and enjoy high-quality organic products.
                    </p>
                </div>
            </div>
        </section>

       

        <footer className="footer">
            <p>© 2025 Farmer Marketplace. All Rights Reserved.</p>
        </footer>
    </div>
    );
       
}

export default Home;