import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import RecruiterNavbar from "../components/RecruiterNavbar";

import {
  Briefcase,
  Users,
  PlusCircle,
  FileText,
} from "lucide-react";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/jobs/stats", {
        headers: {
          Authorization: token,
        },
      });

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <RecruiterNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        {/* Welcome Section */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Welcome,{" "}
            <span className="text-yellow-300">
              {user?.name}
            </span>{" "}
            👋
          </h1>

          <p className="text-white/80 mt-3 text-base sm:text-lg">
            Manage your job postings, track applications, and
            hire the best candidates from one place.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl hover:scale-[1.02] transition duration-300">
            <Briefcase size={48} />

            <h2 className="text-2xl font-bold mt-5">
              Total Jobs
            </h2>

            <p className="text-4xl sm:text-5xl lg:text-6xl mt-4 font-bold">
              {stats.totalJobs}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl hover:scale-[1.02] transition duration-300">
            <Users size={48} />

            <h2 className="text-2xl font-bold mt-5">
              Applications
            </h2>

            <p className="text-4xl sm:text-5xl lg:text-6xl mt-4 font-bold">
              {stats.totalApplications}
            </p>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <button
            onClick={() => navigate("/post-job")}
            className="bg-white text-purple-700 p-5 rounded-2xl text-lg sm:text-xl font-bold hover:scale-105 transition duration-300 flex items-center justify-center gap-3 shadow-xl w-full"
          >
            <PlusCircle size={24} />

            Post Job
          </button>

          <button
            onClick={() => navigate("/my-jobs")}
            className="bg-white text-purple-700 p-5 rounded-2xl text-lg sm:text-xl font-bold hover:scale-105 transition duration-300 flex items-center justify-center gap-3 shadow-xl w-full"
          >
            <FileText size={24} />

            My Jobs
          </button>
        </div>

        {/* Recruiter Tips */}

        <div className="mt-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Hiring Tips 💼
          </h2>

          <p className="text-white mt-4 text-base sm:text-lg leading-7">
            Keep your job descriptions clear and detailed, include
            required skills, salary information, and respond to
            applicants quickly to attract the best talent.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;