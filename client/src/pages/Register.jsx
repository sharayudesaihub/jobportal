import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Users,
  UserPlus,
} from "lucide-react";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration Successful 🎉");

      window.location = "/";
    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex justify-center items-center px-4">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-2xl p-8"
      >

        {/* Header */}

        <div className="flex flex-col items-center mb-8">

          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">

            <UserPlus
              size={40}
              className="text-white"
            />

          </div>

          <h1 className="text-3xl font-bold text-white mt-5">
            Create Account
          </h1>

          <p className="text-slate-400 mt-2 text-center">
            Join JobPortal and start your career journey.
          </p>

        </div>

        {/* Name */}

        <div className="relative mb-5">

          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          />

        </div>

        {/* Email */}

        <div className="relative mb-5">

          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          />

        </div>

        {/* Password */}

        <div className="relative mb-5">

          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          />

        </div>

        {/* Role */}

        <div className="relative mb-8">

          <Users
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition appearance-none"
          >
            <option value="seeker">
              Job Seeker
            </option>

            <option value="recruiter">
              Recruiter
            </option>

          </select>

        </div>

        {/* Register Button */}

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
        >
          Create Account
        </button>

        {/* Login Link */}

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Sign In
          </a>
        </p>

      </motion.div>

    </div>
  );
}

export default Register;