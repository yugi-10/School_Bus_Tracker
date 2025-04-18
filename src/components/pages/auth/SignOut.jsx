import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove authentication data (e.g., token)
    localStorage.removeItem("authToken");  // or sessionStorage.removeItem("authToken");

    // Redirect to login page after signing out
    navigate("/login", { replace: true });  // Ensure the path is "/login"
  }, [navigate]);

  return <div>Signing you out...</div>;
};

export default SignOut;
