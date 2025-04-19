import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Product from "./Pages/Product";
import AddProduct from "./Pages/AddProduct";
import { Route, Routes } from "react-router-dom";
import Consumer from "./Pages/Consumer";
import Card from "./Pages/Card";
import Editproduct from "./Pages/Editproduct";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Add-Product" element={<AddProduct />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/consumer" element={<Consumer />}></Route>
        <Route path="/card" element={<Card />}></Route>
        <Route path="/editproduct/:id" element={<Editproduct />}></Route>

      </Routes>
    </>
  );
}

export default App;
