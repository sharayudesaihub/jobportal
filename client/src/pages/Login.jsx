import { useState, useEffect } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  motion
} from "framer-motion";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Auto redirect if already logged in
  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {

      if (role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/dashboard");
      }

    }

  }, [navigate]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Success 🚀");

      if (res.data.user.role === "recruiter") {

        navigate("/recruiter-dashboard");

      } else {

        navigate("/dashboard");

      }

    } catch (error) {

      alert("Invalid Credentials");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">

      <motion.form
        onSubmit={handleLogin}
        initial={{
          opacity: 0,
          y: 50
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-[400px]"
      >

        <h1 className="text-3xl font-bold text-center mb-6">

          Sign In

        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-6"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl font-bold"
        >

          Sign In

        </button>

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-bold hover:underline"
          >

            Register here

          </Link>

        </p>

      </motion.form>

    </div>

  );
}

export default Login;