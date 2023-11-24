import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ImageAdmin from "../images/login.png";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:8080/api/users/login",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        email,
        password,
      },
    }).then((res) => {
      sessionStorage.setItem("userId", res.data.userId);
      if (res.status === 200) {
        axios({
          method: "GET",
          url: "http://localhost:8080/api/users/initializeSession",
          withCredentials: true,
        }).then((res) => {
          sessionStorage.setItem("transactionId", res.data.transactionId);
          sessionStorage.setItem("redirectUrl", res.data.redirectUrl);
          navigate("/");
        });
      }
    });
  }

  return (
    <section className="bg-gray-900 min-h-screen">
      <div className="flex flex-col min-[815px]:flex-row items-center justify-center px-6 py-8 mx-auto ">
        <div className="min-[815px]:block hidden">
          <img
            src={ImageAdmin}
            alt="Image"
            height={448}
            width={390}
            className="object-contain rounded-l-xl shadow sm:max-w-md"
          />
        </div>
        <div className="w-full bg-texter min-[815px]:rounded-r-xl max-[815px]:rounded-2xl shadow sm:max-w-md py-8 gap-5">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl py-8">
              Register to become a member of our community
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="mb-10">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 "
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-10">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link to="/register" className="text-primary-600 ">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
