import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, RootState } from "../redux/store";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:5000/auth/user", { withCredentials: true });
      dispatch(setUser(res.data));
    };
    fetchUser();
  }, [dispatch]);

  return (
    <div>
      <h2>Dashboard</h2>
      {user.id ? <p>Welcome, {user.name}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
