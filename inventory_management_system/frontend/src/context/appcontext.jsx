import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

export const AppContext = createContext();

 const appContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(Boolean(Cookies.get("token"))); // ✅ fixed
  const backendUrl = "http://localhost:5000";

  const handleRegister = async (name, email, password,role) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/register`,
        { name, email, password,role},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
console.log("registering with",name,email,password,role)
      if (data.success) {
        toast.success(data.message || "Register successful");
         navigate("/login");
        return true; // ✅ success
        // ✅ redirect after registration
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
    return false;
  };

const handleLogin = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/user/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    if (data.success) {
      Cookies.set("token", data.token, { expires: 7 });
      setToken(true);

      const userRole = data.user.role; // get role from backend

      toast.success(data.message || "Login successful");

      // Navigate based on role
      navigate("/dashboard");
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error("Login failed");
  }
  return false;
};

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${Cookies.get("token")}`; // ✅ fixed
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const values = {
    backendUrl,
    handleLogin,
    handleRegister,
    token,
    setToken
  };

  return (
    <AppContext.Provider value={values}>{children}</AppContext.Provider>
  );
};

export default appContextProvider;
