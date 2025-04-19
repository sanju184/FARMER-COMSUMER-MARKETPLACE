import React, { useEffect,useState } from 'react'
import axios from 'axios';
import "./Product.css";
import { useNavigate } from 'react-router-dom';

const Product =()=> {

    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
   


    useEffect(()=>{
        const fetchProduct = async()=>{
             

          


            try{
                const response = await axios.get("http://localhost:5000/api/farmer/products",{
                      headers: {Authorization: `Bearer ${token}`},
                });
                setProducts(response.data);
                console.log("product",products)
            }catch(error){
                console.error("Error fetching products:", error);
            } 
        }

        fetchProduct();
    },[token])


    console.log("product of the dmfndnfj " , products);


    const deleteProduct = async (id) => {
        try {

            console.log("id",id);
            await axios.delete(`http://localhost:5000/api/farmer/delete/${id}`,{
                headers: {Authorization: `Bearer ${token}`},
            });

            setProducts(products.filter((product)=>product._id != id));

            console.log(`Product with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

 

    const editProduct = (id)=>{
           navigate(`/editproduct/${id}`)

    }



  return (


    <div className="product-lists">
    <h2>Your Added Products</h2>
    {products.length === 0 ? (
      <p>No products available.</p>
    ) : (
      <div className="product-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img
                src={`${product.image}`}
                alt={product.name}
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ₹{product.price}</p>
            </div>
            <div className="product-btn">
              <button className="delete-btn" onClick={() => deleteProduct(product._id)}>
                Delete
              </button>
              <button className="edit-btn" onClick={() => editProduct(product._id)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  )
}

export default Product;