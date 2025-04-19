import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role") || null);   
    };

    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const login = (token, userRole,user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("user", user);
    setIsAuthenticated(true);
    setRole(userRole);

    if (  userRole === "admin") {
      navigate("/Admin");
    }
    else if(   userRole === "farmer"){
          navigate("/Add-Product")
    }
    else if( userRole === "consumer"){
      navigate("/consumer");
}

    else{
      navigate("/Login")
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

