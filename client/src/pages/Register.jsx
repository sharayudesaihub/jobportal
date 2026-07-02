import { motion } from "framer-motion";
import {
  User,
  Mail,
  BriefcaseBusiness,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function Profile({ darkMode }) {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const name = user?.name || "Not Available";
  const email = user?.email || "Not Available";
  const role = user?.role || localStorage.getItem("role") || "User";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div
      className={
        darkMode
          ? "bg-slate-950 min-h-screen text-white"
          : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen text-black"
      }
    >
      <Navbar />

      <div className="flex justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={
            darkMode
              ? "bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl p-8"
              : "bg-white w-full max-w-md rounded-3xl shadow-2xl p-8"
          }
        >
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-full">
              <User size={55} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-8">
            My Profile
          </h1>

          {/* Full Name */}
          <div className="flex items-center gap-4 mb-5">
            <User className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-lg">{name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 mb-5">
            <Mail className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-lg">{email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-4 mb-8">
            <BriefcaseBusiness className="text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold text-lg capitalize">{role}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;