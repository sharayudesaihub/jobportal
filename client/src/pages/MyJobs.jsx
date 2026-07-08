import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import RecruiterNavbar from "../components/RecruiterNavbar";

import {
  Building2,
  MapPin,
  IndianRupee,
  Pencil,
  Trash2,
  Users,
  PlusCircle,
} from "lucide-react";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/jobs/my-jobs", {
        headers: {
          Authorization: token,
        },
      });

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/jobs/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Job Deleted Successfully");

      loadJobs();
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <RecruiterNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            My Jobs
          </h1>

          <button
            onClick={() => navigate("/post-job")}
            className="bg-white text-purple-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition w-full sm:w-auto"
          >
            <PlusCircle size={20} />

            Post New Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-16 text-center text-white shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold">
              No Jobs Posted Yet
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/90">
              Start by posting your first job.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-6 text-white hover:scale-[1.02] transition duration-300 flex flex-col"
              >
                <h2 className="text-2xl font-bold mb-5 break-words">
                  {job.title}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 size={18} />

                    <span className="break-words">
                      {job.company}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={18} />

                    <span className="break-words">
                      {job.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <IndianRupee size={18} />

                    <span>{job.salary}</span>
                  </div>
                </div>

                <p className="mt-5 text-white/90 leading-7 break-words flex-grow">
                  {job.description}
                </p>

                <div className="grid grid-cols-3 gap-3 mt-8">
                  <button
                    onClick={() =>
                      navigate(`/edit-job/${job._id}`)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 py-3 rounded-xl flex justify-center items-center transition"
                    title="Edit Job"
                  >
                    <Pencil size={20} />
                  </button>

                  <button
                    onClick={() =>
                      deleteJob(job._id)
                    }
                    className="bg-red-600 hover:bg-red-700 py-3 rounded-xl flex justify-center items-center transition"
                    title="Delete Job"
                  >
                    <Trash2 size={20} />
                  </button>

                  <button
                    onClick={() => {
                      console.log(job._id);
                      navigate(
                        `/applications/${job._id}`
                      );
                    }}
                    className="bg-green-600 hover:bg-green-700 py-3 rounded-xl flex justify-center items-center transition"
                    title="View Applicants"
                  >
                    <Users size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyJobs;