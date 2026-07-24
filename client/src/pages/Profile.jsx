import { motion } from "framer-motion";
import {
  User,
  Mail,
  LogOut,
} from "lucide-react";

import Navbar from "../components/Navbar";

function Profile({ darkMode }) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

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
          transition={{
            duration: 0.4,
          }}
          className="w-full max-w-md bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-2xl p-8"
        >

          {/* Avatar */}

          <div className="flex justify-center mb-6">

            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">

              <User
                size={50}
                className="text-white"
              />

            </div>

          </div>

          {/* Heading */}

          <h1 className="text-3xl font-bold text-white text-center">
            My Profile
          </h1>

          <p className="text-slate-400 text-center mt-2 mb-8">
            Your account information
          </p>

          {/* Name */}

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-5 flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">

              <User
                size={22}
                className="text-white"
              />

            </div>

            <div>

              <p className="text-sm text-slate-400">
                Full Name
              </p>

              <p className="text-lg font-semibold text-white break-words">
                {name}
              </p>

            </div>

          </div>

          {/* Email */}

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-8 flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">

              <Mail
                size={22}
                className="text-white"
              />

            </div>

            <div>

              <p className="text-sm text-slate-400">
                Email Address
              </p>

              <p className="text-lg font-semibold text-white break-all">
                {email}
              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
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