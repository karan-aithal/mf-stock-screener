import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton: React.FC = () => {
  const handleSuccess = async (credentialResponse: any) => {
    console.log("Google Login Success:", credentialResponse);
  
    try {
      // Send the token to your backend to save the user credentials
      const response = await fetch("http://localhost:5000/api/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Backend Response:", data);
  
      // Redirect to the main page
      navigate("/main-page");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleLoginButton;
