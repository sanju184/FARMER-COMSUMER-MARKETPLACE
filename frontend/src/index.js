
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
     <AuthProvider>
    <App />
  </AuthProvider>
    </BrowserRouter>
   
  
   
);
