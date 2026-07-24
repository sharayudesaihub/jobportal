import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import RecruiterNavbar from "../components/RecruiterNavbar";

import {
  Briefcase,
  Users,
  PlusCircle,
  FileText,
  ArrowRight,
} from "lucide-react";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <RecruiterNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

        {/* Hero */}

        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-8 shadow-2xl">

          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Welcome back,
            <span className="text-blue-400">
              {" "}{user?.name}
            </span>
            👋
          </h1>

          <p className="text-slate-400 mt-4 text-lg leading-7 max-w-3xl">
            Manage your job postings, monitor applications and
            recruit top talent through one powerful dashboard.
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-7 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">

              <Briefcase
                size={32}
                className="text-white"
              />

            </div>

            <p className="text-slate-400">
              Total Jobs Posted
            </p>

            <h2 className="text-5xl font-bold text-white mt-3">
              {stats.totalJobs}
            </h2>

          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-7 hover:border-green-500 hover:-translate-y-1 transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-6">

              <Users
                size={32}
                className="text-white"
              />

            </div>

            <p className="text-slate-400">
              Total Applications
            </p>

            <h2 className="text-5xl font-bold text-white mt-3">
              {stats.totalApplications}
            </h2>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold text-white mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <button
              onClick={() => navigate("/post-job")}
              className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-6 flex items-center justify-between text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            >

              <div>

                <PlusCircle size={34} />

                <h3 className="text-2xl font-bold mt-4">
                  Post Job
                </h3>

                <p className="text-blue-100 mt-2">
                  Create a new job opening.
                </p>

              </div>

              <ArrowRight size={28} />

            </button>

            <button
              onClick={() => navigate("/my-jobs")}
              className="bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-2xl p-6 flex items-center justify-between text-white transition-all duration-300"
            >

              <div>

                <FileText size={34} />

                <h3 className="text-2xl font-bold mt-4">
                  My Jobs
                </h3>

                <p className="text-slate-400 mt-2">
                  View, edit and manage jobs.
                </p>

              </div>

              <ArrowRight size={28} />

            </button>

          </div>

        </div>

        {/* Tips */}

        <div className="mt-10 bg-slate-800/80 border border-slate-700 rounded-3xl p-8">

          <h2 className="text-3xl font-bold text-white">
            💡 Hiring Tips
          </h2>

          <p className="text-slate-400 mt-5 leading-8 text-lg">
            • Write clear and attractive job titles.<br />
            • Mention salary and required skills.<br />
            • Keep job descriptions concise and informative.<br />
            • Review applications regularly and respond quickly.<br />
            • A complete job post attracts better candidates.
          </p>

        </div>

      </div>
    </div>
  );
}

export default RecruiterDashboard;