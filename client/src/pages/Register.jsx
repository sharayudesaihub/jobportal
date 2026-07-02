import { useState } from "react";
import { motion } from "framer-motion";
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
        role
      });

      alert("Registration successful");

      window.location = "/";

    } catch {

      alert("Registration failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-700 flex justify-center items-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl w-96"
      >

        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Create Account
        </h1>

        <input
          className="w-full p-3 mb-4 rounded-lg"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded-lg"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded-lg"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full p-3 mb-4 rounded-lg"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="seeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-white text-purple-700 p-3 rounded-lg font-bold"
        >
          Register
        </button>

      </motion.div>

    </div>

  );
}

export default Register;