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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <RecruiterNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">

          <div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              My Jobs
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Manage, edit and monitor all your posted jobs.
            </p>

          </div>

          <button
            onClick={() => navigate("/post-job")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <PlusCircle size={20} />
            Post New Job
          </button>

        </div>

        {/* Total Jobs */}

        <div className="mb-8">

          <div className="inline-flex items-center bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl px-5 py-3 shadow-lg">

            <span className="text-slate-300">
              Total Posted Jobs
            </span>

            <span className="ml-3 text-blue-400 text-xl font-bold">
              {jobs.length}
            </span>

          </div>

        </div>

        {jobs.length === 0 ? (

          <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-14 text-center shadow-xl">

            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-6">

              <PlusCircle
                size={40}
                className="text-white"
              />

            </div>

            <h2 className="text-3xl font-bold text-white">
              No Jobs Posted Yet
            </h2>

            <p className="text-slate-400 mt-4 text-lg">
              Create your first job posting and start hiring talented candidates.
            </p>

            <button
              onClick={() => navigate("/post-job")}
              className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Post Your First Job
            </button>

          </div>

        ) : (

          <>
            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

  {jobs.map((job) => (

    <div
      key={job._id}
      className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-xl p-6 hover:border-blue-500 hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >

      {/* Job Header */}

      <div className="flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">

          <Building2
            size={28}
            className="text-white"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white break-words">
            {job.title}
          </h2>

          <p className="text-slate-400">
            Active Job Posting
          </p>

        </div>

      </div>

      {/* Company */}

      <div className="flex items-center gap-3 mb-4">

        <Building2
          size={18}
          className="text-blue-400"
        />

        <span className="text-slate-300 break-words">
          {job.company}
        </span>

      </div>

      {/* Location */}

      <div className="flex items-center gap-3 mb-4">

        <MapPin
          size={18}
          className="text-green-400"
        />

        <span className="text-slate-300 break-words">
          {job.location}
        </span>

      </div>

      {/* Salary */}

      <div className="flex items-center gap-3 mb-5">

        <IndianRupee
          size={18}
          className="text-yellow-400"
        />

        <span className="text-slate-300">
          {job.salary}
        </span>

      </div>

      {/* Description */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 mb-6 flex-grow">

        <p className="text-slate-400 leading-7 break-words">
          {job.description}
        </p>

      </div>

      {/* Action Buttons */}

      <div className="grid grid-cols-3 gap-3">

        <button
          onClick={() =>
            navigate(`/edit-job/${job._id}`)
          }
          className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl flex justify-center items-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
          title="Edit Job"
        >
          <Pencil
            size={20}
            className="text-white"
          />
        </button>

        <button
          onClick={() =>
            deleteJob(job._id)
          }
          className="bg-red-600 hover:bg-red-700 py-3 rounded-xl flex justify-center items-center transition-all duration-300"
          title="Delete Job"
        >
          <Trash2
            size={20}
            className="text-white"
          />
        </button>

        <button
          onClick={() =>
            navigate(`/applications/${job._id}`)
          }
          className="bg-green-600 hover:bg-green-700 py-3 rounded-xl flex justify-center items-center transition-all duration-300"
          title="View Applicants"
        >
          <Users
            size={20}
            className="text-white"
          />
        </button>

      </div>

    </div>

  ))}

</div>

          </>

        )}

      </div>

    </div>

  );
}

export default MyJobs;