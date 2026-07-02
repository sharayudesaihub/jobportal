import { motion } from "framer-motion";

import {
  User,
  Mail,
  LogOut
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

      <div className="flex justify-center pt-12">

        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className={
            darkMode
              ? "bg-slate-900 p-8 rounded-3xl shadow-xl w-[450px]"
              : "bg-white p-8 rounded-3xl shadow-xl w-[450px]"
          }
        >

          {/* Avatar */}
          <div className="flex justify-center mb-6">

            <div className="bg-blue-600 p-5 rounded-full">

              <User
                size={50}
                color="white"
              />

            </div>

          </div>

          <h1 className="text-3xl font-bold text-center mb-8">

            My Profile

          </h1>

          {/* Name */}
          <div className="flex items-center gap-3 mb-4">

            <User />

            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="text-lg">
                {name}
              </p>
            </div>

          </div>

          {/* Email */}
          <div className="flex items-center gap-3 mb-8">

            <Mail />

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="text-lg">
                {email}
              </p>
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl flex justify-center gap-2 transition"
          >

            <LogOut />

            Logout

          </button>

        </motion.div>

      </div>

    </div>

  );
}

export default Profile;