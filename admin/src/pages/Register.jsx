import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageAdmin from "../images/login.png";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [hotelname, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:8080/api/admin/register",
      JSON.stringify({ hotel_name: hotelname, address, email, password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.status !== 200) {
      alert("Registration Failed");
    } else {
      navigate("/login");
    }
  }

  return (
    <section className="bg-gray-900 min-h-screen">
      <div className="flex flex-col min-[815px]:flex-row items-center justify-center px-6 py-8 mx-auto ">
        <div className="min-[815px]:block hidden">
          <img
            src={ImageAdmin}
            alt="Image"
            height={600}
            width={500}
            className="object-contain rounded-l-xl shadow sm:max-w-md"
          />
        </div>
        <div className="w-full bg-texter min-[815px]:rounded-r-xl max-[815px]:rounded-2xl shadow sm:max-w-md py-2 gap-5">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Register to become a member of our community as a Hotel Owner. To
              bring change in the society.
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Hotel Name
                </label>
                <input
                  type="name"
                  name="name"
                  placeholder=" Hotel Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                  onChange={(e) => setHotelName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Address
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder=" Adreess"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  to="/login"
                  className="text-base underline underline-offset-1 mx-1 text-primary-600"
                >
                  login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
