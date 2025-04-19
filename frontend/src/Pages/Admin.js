import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [farmers, setFarmers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("role");
        console.log("role", user);

        console.log("token", token);

        if (!token && user !== "admin") {
          console.error("No token found, redirecting to login.");
          navigate("/login");
          return;
        }

        const pendingFarmer = await axios.get(
          "http://localhost:5000/api/admin/farmers/pending",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFarmers(pendingFarmer.data);
        console.log("farmer data ", pendingFarmer.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleVerify = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/farmers/approve/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFarmers(farmers.filter((farmer) => farmer._id !== id));
    } catch (error) {
      console.error(
        "Error verifying farmer:",
        error.response?.data || error.message
      );
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/farmers/reject/${id}`
      );
      setFarmers(farmers.filter((farmer) => farmer._id != id));
    } catch (error) {
      console.error("Error rejecting Farmer ", error);
    }
  };

  return (
    <div className="pending-farmers-container">
      <h1>Pending Farmers</h1>
      {farmers.length === 0 ? (
        <p className="no-farmers">No pending farmers.</p>
      ) : (
        <ul className="farmers-lis">
          {farmers.map((farmer) => (
            <li key={farmer._id} className="farmer-item">
              <span>
                {" "}
                {farmer.name} - {farmer.email}
              </span>
              <div className="action-buttons">
                <button
                  className="approve-btn"
                  onClick={() => handleVerify(farmer._id)}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(farmer._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Admin;
