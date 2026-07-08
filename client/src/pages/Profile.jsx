import { motion } from "framer-motion";

import {
  User,
  Mail,
  LogOut,
} from "lucide-react";

import Navbar from "../components/Navbar";

function Profile({ darkMode }) {
  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const name = user?.name || "Not Available";
  const email = user?.email || "Not Available";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    window.location = "/";
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 flex justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className={
            darkMode
              ? "bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8"
              : "bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8"
          }
        >
          {/* Avatar */}

          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 w-24 h-24 rounded-full flex items-center justify-center shadow-lg">
              <User
                size={50}
                color="white"
              />
            </div>
          </div>

          {/* Heading */}

          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            My Profile
          </h1>

          {/* Name */}

          <div
            className={
              darkMode
                ? "flex items-center gap-4 bg-slate-800 rounded-2xl p-4 mb-5"
                : "flex items-center gap-4 bg-slate-100 rounded-2xl p-4 mb-5"
            }
          >
            <div className="bg-blue-600 p-3 rounded-full">
              <User
                size={22}
                color="white"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="text-lg font-semibold break-words">
                {name}
              </p>
            </div>
          </div>

          {/* Email */}

          <div
            className={
              darkMode
                ? "flex items-center gap-4 bg-slate-800 rounded-2xl p-4 mb-8"
                : "flex items-center gap-4 bg-slate-100 rounded-2xl p-4 mb-8"
            }
          >
            <div className="bg-purple-600 p-3 rounded-full">
              <Mail
                size={22}
                color="white"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="text-lg font-semibold break-all">
                {email}
              </p>
            </div>
          </div>

          {/* Logout */}

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition duration-300 hover:scale-105"
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