import { useDispatch } from "react-redux";
import { setUser } from "../redux/store";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
