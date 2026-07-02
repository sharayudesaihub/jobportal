import Navbar from "../components/Navbar";

import {
  Briefcase,
  Users,
  Search,
  User,
  RefreshCw
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard({
  darkMode,
  setDarkMode
}) {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] =
    useState({
      totalJobs: 0,
      totalApplications: 0
    });

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await API.get(
          "/jobs/stats",
          {
            headers: {
              Authorization: token
            }
          }
        );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Welcome Section */}

        <motion.div

          initial={{ opacity: 0, y: -40 }}

          animate={{ opacity: 1, y: 0 }}

          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-10"

        >

          <h1 className="text-5xl font-bold text-white">

            Welcome back,

            <span className="text-yellow-300">

              {" "}

              {user?.name}

            </span>

            👋

          </h1>

          <p className="text-white/80 mt-4 text-lg">

            Manage your profile, explore jobs and keep track of your applications from one place.

          </p>

        </motion.div>

        {/* Search */}

        <div className="relative mb-10">

          <Search
            className="absolute left-5 top-4 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e)=>
              setSearch(e.target.value)
            }
            className="
            w-full
            md:w-2/3
            bg-white
            rounded-2xl
            pl-14
            pr-5
            py-4
            shadow-xl
            outline-none
            text-lg
            "
          />

        </div>

        {/* Main Cards */}

        <div className="grid md:grid-cols-2 gap-8">

          <motion.div

            whileHover={{
              scale: 1.04
            }}

            className="
            bg-white/10
            backdrop-blur-xl
            rounded-3xl
            p-8
            text-white
            shadow-2xl
            "

          >

            <Briefcase size={55} />

            <h2 className="text-2xl font-semibold mt-6">

              Total Jobs

            </h2>

            <p className="text-6xl font-bold mt-4">

              {stats.totalJobs}

            </p>

          </motion.div>

          <motion.div

            whileHover={{
              scale: 1.04
            }}

            className="
            bg-white/10
            backdrop-blur-xl
            rounded-3xl
            p-8
            text-white
            shadow-2xl
            "

          >

            <Users size={55} />

            <h2 className="text-2xl font-semibold mt-6">

              Applications

            </h2>

            <p className="text-6xl font-bold mt-4">

              {stats.totalApplications}

            </p>

          </motion.div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <button

            onClick={() => navigate("/jobs")}

            className="bg-white text-purple-700 rounded-2xl py-5 text-xl font-bold shadow-xl hover:scale-105 transition"

          >

            Browse Jobs

          </button>

          <button

            onClick={() => navigate("/profile")}

            className="bg-white text-purple-700 rounded-2xl py-5 text-xl font-bold shadow-xl hover:scale-105 transition"

          >

            My Profile

          </button>

          <button

            onClick={fetchStats}

            className="bg-white text-purple-700 rounded-2xl py-5 text-xl font-bold shadow-xl hover:scale-105 transition flex justify-center items-center gap-3"

          >

            <RefreshCw />

            Refresh

          </button>

        </div>

        {/* Motivation Banner */}

        <motion.div

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          transition={{
            delay: 0.3
          }}

          className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 mt-10 shadow-2xl"

        >

          <h2 className="text-3xl font-bold text-white">

            Keep Growing 🚀

          </h2>

          <p className="text-white text-lg mt-4">

            Complete your profile, explore new opportunities and apply regularly to increase your chances of getting hired.

          </p>

        </motion.div>

        {/* Extra Stats */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-white shadow-xl">

            <User size={40} />

            <h3 className="text-xl mt-4">

              Profile Status

            </h3>

            <p className="text-5xl font-bold mt-3">

              100%

            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-white shadow-xl">

            <Briefcase size={40} />

            <h3 className="text-xl mt-4">

              Active Jobs

            </h3>

            <p className="text-5xl font-bold mt-3">

              {stats.totalJobs}

            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-white shadow-xl">

            <Users size={40} />

            <h3 className="text-xl mt-4">

              Total Applications

            </h3>

            <p className="text-5xl font-bold mt-3">

              {stats.totalApplications}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;