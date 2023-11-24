import LoadingButton from "@mui/lab/LoadingButton";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    
    await axios({
      method: "POST",
      url: "http://localhost:8080/api/users/logout",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        sessionStorage.removeItem("userId");
        navigate("/login");
      }
    });
  }
  return (
    <div className="bg-gray-900">
      <div className="pt-5 px-4 ">
        <div className="flex justify-between items-center bg-texter px-4 py-4 rounded-2xl">
          <h1 className="text-2xl text-blue-700">
            Q<span className="text-gray-800">yaar</span>
          </h1>

          {sessionStorage.getItem("userId") ? (
            // If "userId" exists in sessionStorage, render the Logout button
            <button
              type="button"
              className="text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            // If "userId" does not exist, render the Login button
            <Link to="login">
              <button
                type="button"
                className="text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
