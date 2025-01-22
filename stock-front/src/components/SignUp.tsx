import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";
import GoogleLoginButton from "./GoogleLoginButton";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUp(email, password);
      console.log("Sign Up Successful:", response);
      navigate("/dashboard"); // Redirect after successful registration
    } catch (err) {
      setError("Error creating account");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <GoogleLoginButton />
    </div>
  );
};

export default SignUp;
