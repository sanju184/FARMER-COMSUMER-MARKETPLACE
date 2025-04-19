import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Editproduct=() =>{

        const [products,setProducts] = useState([]);
        const [form,setForm] = useState({
                    name :'',
                    category:'',
                    description:'',
                    price:''

        });


        const token = localStorage.getItem("token");
        
        const {id} = useParams();



        useEffect(()=>{
            const fetchProduct = async()=>{
                try{
                    const response = await axios.get("http://localhost:5000/api/farmer/products",{
                          headers: {Authorization: `Bearer ${token}`},
                    });
                    setProducts(response.data);

                    
                }catch(error){
                    console.error("Error fetching products:", error);
                } 
            }
    
            fetchProduct();
        },[token]);

        


        useEffect(()=>{
            const productToEdit = products.find((product)=>product._id ===id);

            if(productToEdit){
                setForm({
                    name :productToEdit.name,
                    category:productToEdit.category,
                    description:productToEdit.description,
                    price:productToEdit.price
                });
            }


        },[products,id]);





    
        const handleImageChange = (e) => {
            setForm({ ...form, image: e.target.files[0] });
          };
    
    const handleCange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
        
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('category', form.category);
        formData.append('description', form.description);
        formData.append('price', form.price);


        if (form.image) {
            formData.append('image', form.image);  
          }

          


          try{
              const response = await axios.put(`http://localhost:5000/api/farmer/update/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                      },
                }
              );

              alert(response.data.message);
          }catch(err){
            console.error("Error updating product:", err);
          }

          setForm({
            name :'',
            category:'',
            description:'',
            price:''
          });

    }





        


  
    







  return (
    <div className='product-containar'>
    <h2>Edit product </h2>

    <form  onSubmit={handleSubmit} > 
    <input type='text' name='name' placeholder='enter the nome of product' value={form.name} onChange={handleCange}/>

    <input type='text' name='category' placeholder='enter the category' value={form.category} onChange={handleCange}/>

   <textarea name='description' placeholder='description'  value={form.description} onChange={handleCange}/>

   <input type='number' name='price' placeholder='enter the price of the product' value={form.price} onChange={handleCange}/>

   <input
          type='file'
          name='image'
          onChange={handleImageChange}
        />

    

   <button type='submit'>Edit product</button>

   </form>




</div>
  )
}

export default Editproduct