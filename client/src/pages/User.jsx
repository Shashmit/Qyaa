import React, { useEffect, useState } from "react";
import axios from "axios";
// import QrGen from "./compartment/QrGen";
import { Navigate, useNavigate } from "react-router-dom";
import QrGen from "../components/Qrgen";

const User = () => {
  const [digilockerCode, setdigilockerCode] = useState(
    sessionStorage.getItem("digilockerCode") || ""
  );
  const [userId, setUserId] = useState("");
  const transactionId = sessionStorage.getItem("transactionId");
  const navigate = useNavigate();

  async function retrive(e) {
    e.preventDefault();
    await axios.post(
      "http://localhost:8080/api/users/saveAadhaar",
      {
        digilockerCode,
        transactionId,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  }

  if (sessionStorage.getItem("userId")) {
    return (
      <section className="bg-gray-900 h-screen w-full flex flex-col items-center pt-6 overflow-scroll">
        <div className="pt-2 mx-auto min-[820px]:flex-row min-[820px]:gap-2 flex flex-col gap-2">
          <div className="bg-texter rounded-xl shadow ">
            <div className="p-4 md:space-y-1 sm:p-6 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Welcome to the User Dashboard
              </h1>
              <p>To verify Aadhar Details</p>
            </div>
          </div>
          <div className="bg-texter rounded-xl shadow ">
            <div className="p-4 md:space-y-1 sm:p-6 flex items-center justify-center">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <a href={sessionStorage.getItem("redirectUrl")} target="_blank">
                  Click here
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-2 mx-auto gap-2 min-[820px]:flex-row min-[820px]:gap-2 flex flex-col">
          <div className="bg-texter rounded-xl shadow ">
            <div className="p-6 md:space-y-1 sm:p-8 ">
              <form className="flex flex-col" onSubmit={retrive}>
                <input
                  type="text"
                  name="text"
                  placeholder="Enter the Copied Variable"
                  className="p-2 mt-8 rounded-xl hover:border"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setdigilockerCode(() => {
                      sessionStorage.setItem("digilockerCode", newValue);
                      return newValue;
                    });
                  }}
                />
                <button
                  type="submit"
                  className="bg-raid rounded-2xl py-2 text-gray hover: cursor-pointer hover:ring-2 hover:ring-opacity-5 text-m px-3 mt-4"
                >
                  QR
                </button>
              </form>
            </div>
          </div>
          <div className="bg-texter rounded-xl shadow ">
            <div className="p-8 md:space-y-1 sm:p-6 ">
              <QrGen sentValue={sessionStorage.getItem("userId") || ""} />
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Navigate to="login" />
      </div>
    );
  }
};

export default User;
