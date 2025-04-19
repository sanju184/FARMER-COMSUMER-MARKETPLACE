import axios from "axios";
import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


const Login = () =>{
        
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState("");
    const { login } = useAuth();



    const navigate = useNavigate();


    const handleLogin = async(e)=>{
        e.preventDefault();
        console.log(email ,password);
        try{
            const response = await axios.post('http://localhost:5000/api/auth/login',{email,password});

                alert('Login successfully');

                login(response.data.token,response.data.role);

        } catch(err){
           const errorMessage = err.response?.data?.message || 'login failed ';



           if(errorMessage==="invalid credentials "){
              setError("your email not registered")
           }
           else if(errorMessage==='wrong password '){
            setError("wrong password");
           }

           else if(errorMessage==='Your account is pending verification '){
            setError("Your account has not been verified by the admin.");
           }

           else{
              setError(errorMessage);                              
           }
        
          
           setEmail("");
           setPassword("");

          
        }
      
        
    }

    return (
        <div className="register-container">
        <form onSubmit={handleLogin} className="register-form">
          <h2>Login</h2>

          {error && <p className="error-msg">{error}</p>}
  
  
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email" 
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
  
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
  
  
          <button type="submit"  className="register-btn" >Login</button>
        </form>
      </div>
    )
}

export default Login;