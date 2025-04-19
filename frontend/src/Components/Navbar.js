import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.webp";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  return (
    <nav className="navbar ">
      <div className="logo-container">
        <img src={logo} alt="farmer Marketplace Logo" className="logo" />
        <h1>Farmer Marketplace</h1>
      </div>
      <div className="links">

      {isAuthenticated && role === "consumer" && <Link to="/consumer">consumer</Link>}
        

        {isAuthenticated && role === "admin" && <Link to="/Admin">Admin</Link>}
        

        {isAuthenticated && role === "farmer" && ( <>
      
          <Link to="/Add-Product">Add product</Link>
          <Link to="/products">your Product </Link>
          </>)}

        {!isAuthenticated ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogOut}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
