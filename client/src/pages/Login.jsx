import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Mail, Lock } from "lucide-react";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4">

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-2xl p-8"
      >

        {/* Logo */}

        <div className="flex flex-col items-center mb-8">

          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">

            <BriefcaseBusiness size={34} className="text-white" />

          </div>

          <h1 className="text-3xl font-bold text-white mt-4">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-2 text-center">
            Sign in to continue to your Job Portal account.
          </p>

        </div>

        {/* Email */}

        <div className="relative mb-5">

          <Mail
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          />

        </div>

        {/* Password */}

        <div className="relative mb-7">

          <Lock
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          />

        </div>

        {/* Button */}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
        >
          Sign In
        </button>

        {/* Register */}

        <p className="text-center mt-8 text-slate-400">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-400 font-semibold hover:text-blue-300 transition"
          >
            Register here
          </Link>

        </p>

      </motion.form>

    </div>
  );
}

export default Login;