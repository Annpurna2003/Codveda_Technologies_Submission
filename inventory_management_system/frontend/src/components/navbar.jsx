import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/mylogo.png"; 
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    
    localStorage.removeItem("user"); // example
    navigate("/login");
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId"); // store UID on login
        const { data } = await axios.get(`/api/users/${userId}`);
        if (data.success) setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav style={styles.nav}>
      <img src={logo} alt="Logo" style={{ height: "60px", marginRight: "10px" }} />
      <div style={styles.brand}>Store Management System</div>
      <div style={styles.userSection}>
        {user && <span>Hi, {user.name}</span>}
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    height: "60px",
    backgroundColor: "#1F2937",
    color: "#fff",
  },
  brand: { fontSize: "20px", fontWeight: "bold" },
  userSection: { display: "flex", alignItems: "center", gap: "10px" },
  logoutBtn: { padding: "5px 10px", cursor: "pointer", fontSize: "20px" },
};

export default Navbar;
