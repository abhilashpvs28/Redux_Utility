// src/pages/Register.jsx

import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {

  const [formdata,setFormdata] = useState({
    name : "",
    email : "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register",formdata);
      console.log("Registration Response:", res.data);
      toast.success("Register Successful!");

      setFormdata({
        name:"",
        email:"",
        password:""
      })
    } catch (err) {
      alert("Registration failed!", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <form
        onSubmit={handleRegister}
       className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formdata.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formdata.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formdata.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Register
        </button>
        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
