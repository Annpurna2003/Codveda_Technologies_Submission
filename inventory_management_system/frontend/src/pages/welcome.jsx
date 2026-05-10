import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleStart = () => {
    navigate("/register"); // ✅ navigate to Register page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Store Management System</h1>
      <p style={styles.subtext}>
        Efficiently manage your inventory, sales, and suppliers — all in one place.
      </p>

      <button
        style={{
          ...styles.button,
          ...(isHovered ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleStart}
      >
        Let’s Get Started
      </button>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', 'Playfair Display SC', 'Alfa Slab One', sans-serif",
    height: "100vh",
    background: "linear-gradient(135deg, #0f0557ff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    padding: "0 20px",
  },
  heading: {
    fontWeight: "700",
    fontSize: "3.5rem",
    marginBottom: "1rem",
    letterSpacing: "1px",
  },
  subtext: {
    fontSize: "1.1rem",
    maxWidth: "500px",
    marginBottom: "2rem",
    lineHeight: "1.6",
  },
  button: {
    backgroundColor: "white",
    color: "#007bff",
    border: "none",
    padding: "0.9rem 2rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderRadius: "30px",
    cursor: "pointer",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // ✅ shadow
    transition: "all 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#007bff",
    color: "white",
    transform: "scale(1.05)", // ✅ hover zoom
    boxShadow: "0px 8px 20px rgba(0, 123, 255, 0.4)", // ✅ brighter shadow
  },
};

export default Welcome;
