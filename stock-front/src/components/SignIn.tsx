import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/authService";
import GoogleLoginButton from "./GoogleLoginButton";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn(email, password);
      console.log("Sign In Successful:", response);
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
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
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <GoogleLoginButton />
    </div>
  );
};

export default SignIn;
