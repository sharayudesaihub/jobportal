import Navbar from "../components/Navbar";

import {
  Briefcase,
  Users,
  Search,
  User,
  RefreshCw,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard({
  darkMode,
  setDarkMode,
}) {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
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

      const res = await API.get(
        "/jobs/stats",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

        {/* Welcome Card */}

        <motion.div
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
        >

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

            <div>

              <p className="text-lg text-white/80">

                Welcome Back 👋

              </p>

              <h1 className="text-4xl lg:text-5xl font-bold mt-2">

                {user?.name}

              </h1>

              <p className="mt-5 text-white/90 max-w-2xl leading-7">

                Discover new opportunities, manage your applications,
                and keep your profile updated to increase your chances
                of getting hired.

              </p>

              <button
                onClick={() =>
                  navigate("/jobs")
                }
                className="mt-8 bg-white text-purple-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition"
              >

                Browse Jobs

                <ArrowRight size={20} />

              </button>

            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 min-w-[260px]">

              <Sparkles
                size={45}
                className="mb-4"
              />

              <p className="text-lg">

                Career Tip

              </p>

              <h2 className="text-2xl font-bold mt-2">

                Complete Your Profile

              </h2>

              <p className="mt-4 text-white/90">

                Recruiters are more likely to contact candidates with
                complete profiles.

              </p>

            </div>

          </div>

        </motion.div>

        {/* Search */}

        <div className="relative mt-10">

          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              lg:w-2/3
              bg-white
              rounded-2xl
              pl-14
              pr-5
              py-4
              shadow-lg
              outline-none
              text-lg
            "
          />

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <motion.div
            whileHover={{
              y: -6,
            }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >

            <div className="flex justify-between items-center">

              <Briefcase
                size={45}
                className="text-indigo-600"
              />

              <span className="text-sm text-gray-500">

                Available

              </span>

            </div>

            <h3 className="text-gray-500 mt-6">

              Total Jobs

            </h3>

            <p className="text-5xl font-bold text-gray-800 mt-2">

              {stats.totalJobs}

            </p>

          </motion.div>

          <motion.div
            whileHover={{
              y: -6,
            }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >

            <div className="flex justify-between items-center">

              <Users
                size={45}
                className="text-pink-600"
              />

              <span className="text-sm text-gray-500">

                Applied

              </span>

            </div>

            <h3 className="text-gray-500 mt-6">

              Applications

            </h3>

            <p className="text-5xl font-bold text-gray-800 mt-2">

              {stats.totalApplications}

            </p>

          </motion.div>

          <motion.div
            whileHover={{
              y: -6,
            }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >

            <div className="flex justify-between items-center">

              <User
                size={45}
                className="text-green-600"
              />

              <span className="text-sm text-green-600 font-semibold">

                Complete

              </span>

            </div>

            <h3 className="text-gray-500 mt-6">

              Profile Status

            </h3>

            <p className="text-5xl font-bold text-gray-800 mt-2">

              100%

            </p>

          </motion.div>

        </div>

        {/* ---------- PART 2 STARTS FROM HERE ---------- */}
                {/* Quick Actions */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">

            Quick Actions

          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate("/jobs")}
              className="bg-white rounded-3xl shadow-lg p-8 text-left"
            >

              <Briefcase
                size={45}
                className="text-indigo-600 mb-5"
              />

              <h3 className="text-2xl font-bold text-gray-800">

                Browse Jobs

              </h3>

              <p className="text-gray-500 mt-3">

                Explore new opportunities matching your skills.

              </p>

            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate("/profile")}
              className="bg-white rounded-3xl shadow-lg p-8 text-left"
            >

              <User
                size={45}
                className="text-purple-600 mb-5"
              />

              <h3 className="text-2xl font-bold text-gray-800">

                My Profile

              </h3>

              <p className="text-gray-500 mt-3">

                Update your profile and improve visibility.

              </p>

            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={fetchStats}
              className="bg-white rounded-3xl shadow-lg p-8 text-left"
            >

              <RefreshCw
                size={45}
                className="text-green-600 mb-5"
              />

              <h3 className="text-2xl font-bold text-gray-800">

                Refresh

              </h3>

              <p className="text-gray-500 mt-3">

                Reload the latest dashboard statistics.

              </p>

            </motion.button>

          </div>

        </div>

        {/* Career Progress */}

        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white">

          <h2 className="text-3xl font-bold">

            Career Progress 🚀

          </h2>

          <p className="mt-3 text-white/90">

            Keep improving your profile to attract recruiters.

          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-white/15 rounded-2xl p-6">

              <h3 className="font-bold text-xl">

                ✅ Profile

              </h3>

              <p className="mt-3">

                Completed

              </p>

            </div>

            <div className="bg-white/15 rounded-2xl p-6">

              <h3 className="font-bold text-xl">

                📄 Applications

              </h3>

              <p className="mt-3">

                {stats.totalApplications} Submitted

              </p>

            </div>

            <div className="bg-white/15 rounded-2xl p-6">

              <h3 className="font-bold text-xl">

                💼 Jobs Available

              </h3>

              <p className="mt-3">

                {stats.totalJobs} Openings

              </p>

            </div>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">

            Recent Activity

          </h2>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="border-l-4 border-indigo-600 pl-5 py-3">

              <h3 className="font-semibold text-lg text-gray-800">

                Dashboard Loaded

              </h3>

              <p className="text-gray-500">

                Your latest statistics have been loaded successfully.

              </p>

            </div>

            <div className="border-l-4 border-pink-600 pl-5 py-3 mt-6">

              <h3 className="font-semibold text-lg text-gray-800">

                Applications

              </h3>

              <p className="text-gray-500">

                Total Applications:
                {" "}
                {stats.totalApplications}

              </p>

            </div>

            <div className="border-l-4 border-green-600 pl-5 py-3 mt-6">

              <h3 className="font-semibold text-lg text-gray-800">

                Jobs Available

              </h3>

              <p className="text-gray-500">

                Total Jobs:
                {" "}
                {stats.totalJobs}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;