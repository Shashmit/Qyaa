import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Scanner from "../components/Scanner";
import Base64ToImage from "../components/Base64ToImage";

const Admin = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState(null);

  function handleSubmit() {
    setUserId((prev) => localStorage.getItem("qr"));
    axios({
      method: "POST",
      url: "http://localhost:8080/api/admin/getData",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        email,
        userId,
      },
    })
      .then((res) => {
        setData(res.data.storedata);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const res = localStorage.getItem("qr");

  return (
    <section className="bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto gap-4">
        <div className="w-full bg-texter rounded-2xl shadow sm:max-w-md py-8 gap-5">
          <div className="px-3 py-2">
            <Scanner />
            <button
              type="submit"
              className="w-full text-white mt-2 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={handleSubmit}
            >
              Scan
            </button>
          </div>
        </div>
        <div className="w-full bg-texter rounded-2xl shadow sm:max-w-md py-8 gap-5">
          <div className="px-3">
            {data === null ? (
              <div>it will be genterated</div>
            ) : (
              <div className="flex flex-row justify-between px-3">
                <div>
                  <br />
                  <label className="text-sm font-medium text-gray-700">
                    Aadhar Number
                  </label>
                  <p>{data.aadhaarUid}</p>
                  <div className="flex flex-row gap-2 items-center">
                    <label className="text-sm font-medium text-gray-700">
                      Name :
                    </label>
                    <h1>{data.proofOfIdentity.name}</h1>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <label className="text-sm font-medium text-gray-700 ">
                      Date of Birth :
                    </label>
                    <h3>{data.proofOfIdentity.dob}</h3>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <label className="text-sm font-medium text-gray-700 ">
                      Gender :
                    </label>
                    <p>{data.proofOfIdentity.gender}</p>
                  </div>
                  <p>
                    {data.proofOfAddress.district +
                      ", " +
                      data.proofOfAddress.state}
                  </p>
                </div>
                <Base64ToImage base64Image={data.image} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
