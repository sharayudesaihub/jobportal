import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import RecruiterNavbar from "../components/RecruiterNavbar";

import {
  Briefcase,
  Users,
  PlusCircle,
  FileText
} from "lucide-react";

function RecruiterDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0
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

      const res = await API.get(
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

    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">

      <RecruiterNavbar />

      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-white">

          Welcome, {user?.name} 👋

        </h1>

        <p className="text-white/80 mt-2 text-lg">

          Recruiter Dashboard

        </p>

        {/* Stats */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition">

            <Briefcase size={45} />

            <h2 className="text-2xl font-bold mt-4">

              Total Jobs

            </h2>

            <p className="text-5xl mt-4 font-bold">

              {stats.totalJobs}

            </p>

          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition">

            <Users size={45} />

            <h2 className="text-2xl font-bold mt-4">

              Applications

            </h2>

            <p className="text-5xl mt-4 font-bold">

              {stats.totalApplications}

            </p>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <button
            onClick={() => navigate("/post-job")}
            className="bg-white text-purple-700 p-5 rounded-2xl text-xl font-bold hover:scale-105 transition flex items-center justify-center gap-3 shadow-lg"
          >

            <PlusCircle />

            Post Job

          </button>

          <button
            onClick={() => navigate("/my-jobs")}
            className="bg-white text-purple-700 p-5 rounded-2xl text-xl font-bold hover:scale-105 transition flex items-center justify-center gap-3 shadow-lg"
          >

            <FileText />

            My Jobs

          </button>

        </div>

      </div>

    </div>

  );

}

export default RecruiterDashboard;