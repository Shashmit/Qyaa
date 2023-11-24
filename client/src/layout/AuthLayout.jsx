import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8080/api/users/checkAuth",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.isLoggedIn) {
        navigate("/");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
