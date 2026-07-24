import Navbar from "../components/Navbar";

import {
  Briefcase,
  Users,
  Search,
  User,
  RefreshCw,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

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

  const [stats, setStats] =
    useState({
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

      const res =
        await API.get(
          "/jobs/seeker-stats",
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
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
    <Navbar
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

      {/* Welcome */}

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-xl p-8"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <p className="text-slate-400 text-lg">
              Welcome Back 👋
            </p>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-2">
              {user?.name}
            </h1>

            <p className="text-slate-300 mt-5 max-w-2xl leading-7">
              Discover new career opportunities, manage your applications,
              and build a professional profile that stands out to recruiters.
            </p>

            <button
              onClick={() => navigate("/jobs")}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Browse Jobs
              <ArrowRight size={20} />
            </button>

          </div>

          <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-6 lg:w-80">

            <Sparkles
              size={45}
              className="text-blue-400 mb-4"
            />

            <h2 className="text-2xl font-bold text-white">
              Career Tip
            </h2>

            <p className="text-slate-300 mt-4 leading-7">
              Apply consistently and keep your profile updated to improve your
              chances of getting shortlisted.
            </p>

          </div>

        </div>
      </motion.div>

      {/* Search */}

      <div className="relative mt-10">

        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-2/3 bg-slate-800 border border-slate-700 rounded-2xl pl-14 pr-5 py-4 shadow-lg outline-none text-lg text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
        />

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        {/* Total Jobs */}

        <motion.div
          whileHover={{ y: -6 }}
          className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-xl p-6 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300"
        >

          <div className="flex justify-between items-center">

            <Briefcase
              size={45}
              className="text-blue-400"
            />

            <TrendingUp className="text-blue-400" />

          </div>

          <p className="mt-6 text-slate-400">
            Total Jobs
          </p>

          <h2 className="text-5xl font-bold text-white mt-2">
            {stats.totalJobs}
          </h2>

          <p className="mt-3 text-slate-400">
            Jobs available for you
          </p>

        </motion.div>

        {/* Applications */}

        <motion.div
          whileHover={{ y: -6 }}
          className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-xl p-6 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300"
        >

          <div className="flex justify-between items-center">

            <Users
              size={45}
              className="text-green-400"
            />

            <TrendingUp className="text-blue-400" />

          </div>

          <p className="mt-6 text-slate-400">
            Applications
          </p>

          <h2 className="text-5xl font-bold text-white mt-2">
            {stats.totalApplications}
          </h2>

          <p className="mt-3 text-slate-400">
            Applications submitted
          </p>

        </motion.div>

        {/* Profile */}

        <motion.div
          whileHover={{ y: -6 }}
          className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-xl p-6 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300"
        >

          <div className="flex justify-between items-center">

            <User
              size={45}
              className="text-purple-400"
            />

            <TrendingUp className="text-blue-400" />

          </div>

          <p className="mt-6 text-slate-400">
            Profile Status
          </p>

          <h2 className="text-5xl font-bold text-white mt-2">
            100%
          </h2>

          <p className="mt-3 text-slate-400">
            Profile completed
          </p>

        </motion.div>

      </div>

      {/* PART 2 STARTS HERE */}

        {/* PART 2 STARTS HERE */}
                {/* Quick Actions */}

             {/* Quick Actions */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold text-white mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <motion.div
            whileHover={{ y: -6 }}
            onClick={() => navigate("/jobs")}
            className="cursor-pointer bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-6 shadow-xl hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300"
          >

            <Briefcase
              size={45}
              className="text-blue-400"
            />

            <h3 className="text-2xl font-bold text-white mt-5">
              Browse Jobs
            </h3>

            <p className="text-slate-400 mt-3">
              Explore the latest opportunities from top companies.
            </p>

          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            onClick={() => navigate("/profile")}
            className="cursor-pointer bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-6 shadow-xl hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300"
          >

            <User
              size={45}
              className="text-green-400"
            />

            <h3 className="text-2xl font-bold text-white mt-5">
              My Profile
            </h3>

            <p className="text-slate-400 mt-3">
              Update your information and improve your visibility.
            </p>

          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            onClick={fetchStats}
            className="cursor-pointer bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-6 shadow-xl hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300"
          >

            <RefreshCw
              size={45}
              className="text-purple-400"
            />

            <h3 className="text-2xl font-bold text-white mt-5">
              Refresh
            </h3>

            <p className="text-slate-400 mt-3">
              Refresh your dashboard and latest statistics.
            </p>

          </motion.div>

        </div>

      </div>

      {/* Career Progress */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold text-white mb-6">
          Career Progress
        </h2>

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-8 shadow-xl">

          <div className="grid md:grid-cols-3 gap-8">

            <div>

              <h3 className="text-xl font-bold text-green-400">
                ✔ Profile Completed
              </h3>

              <p className="text-slate-400 mt-2">
                Your profile is ready for recruiters.
              </p>

            </div>

            <div>

              <h3 className="text-xl font-bold text-blue-400">
                📄 Applications
              </h3>

              <p className="text-slate-400 mt-2">
                Total Submitted:
                <span className="font-bold text-white">
                  {" "}
                  {stats.totalApplications}
                </span>
              </p>

            </div>

            <div>

              <h3 className="text-xl font-bold text-purple-400">
                💼 Opportunities
              </h3>

              <p className="text-slate-400 mt-2">
                Available Jobs:
                <span className="font-bold text-white">
                  {" "}
                  {stats.totalJobs}
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Latest Updates */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold text-white mb-6">
          Latest Updates
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-6 shadow-xl hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300">

            <h3 className="text-xl font-bold text-white">
              🚀 Stay Active
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              Regularly apply for jobs and keep your profile updated.
              Recruiters are more likely to contact active candidates.
            </p>

          </div>

          <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-6 shadow-xl hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300">

            <h3 className="text-xl font-bold text-white">
              💡 Pro Tip
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              Tailor your resume for every job application and highlight
              relevant skills to increase your chances of getting shortlisted.
            </p>

          </div>

        </div>

      </div>

      </div>

    </div>

  );

}

export default Dashboard;