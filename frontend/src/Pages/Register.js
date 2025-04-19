import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Register = () => {
  const [role, setRole] = useState("consumer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      console.log(name, email, password, role);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password, role }
      );

      alert(response.data.message);
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response.data.message ||
        "Registration failed. Please try again later.";

      if (errorMessage === "User already exists") {
        setError("This email is already registered. Please login.");
      } else if (errorMessage === "All fields are required") {
        setError("please fill all field ");
      } else {
        setError(errorMessage);
      }
    }
    setName("");
    setEmail("");
    setPassword("");
    setRole("consumer");
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register</h2>

        {error && <p className="error-msg">{error}</p>}

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="role">Register As:</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="farmer">Farmer</option>
          <option value="consumer">Consumer</option>
        </select>

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
