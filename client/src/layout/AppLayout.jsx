import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

const AppLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [digilockerCode, setdigilockerCode] = useState(
    sessionStorage.getItem("digilockerCode") || ""
  );
  const [userId, setUserId] = useState("");
  const transactionId = sessionStorage.getItem("transactionId");

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/users/checkAuth",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      if (!res?.data?.isLoggedIn) {
        axios({
          method: "GET",
          url: "http://localhost:8080/api/users/logout",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }).then(() => {
          navigate("/login");
        });
      }
    });
    setLoading(false);
  }, [navigate, userId]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
