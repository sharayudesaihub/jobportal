import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  IndianRupee,
  FileText,
} from "lucide-react";

import API from "../services/api";
import RecruiterNavbar from "../components/RecruiterNavbar";

function PostJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/jobs", job, {
        headers: {
          Authorization: token,
        },
      });

      alert("🎉 Job Posted Successfully");

      navigate("/my-jobs");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to post job"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <RecruiterNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 flex justify-center">

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8"
        >

          {/* Header */}

          <div className="flex flex-col items-center mb-8">

            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">

              <BriefcaseBusiness
                size={32}
                className="text-white"
              />

            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mt-5">
              Post New Job
            </h1>

            <p className="text-slate-400 mt-2 text-center">
              Fill in the details below to publish your job opening.
            </p>

          </div>

          <div className="space-y-5">

            {/* Job Title */}

            <div>

              <label className="block text-slate-300 font-semibold mb-2">
                Job Title
              </label>

              <div className="relative">

                <BriefcaseBusiness
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="title"
                  value={job.title}
                  placeholder="Frontend Developer"
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

            </div>

            {/* Company */}

            <div>

              <label className="block text-slate-300 font-semibold mb-2">
                Company Name
              </label>

              <div className="relative">

                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="company"
                  value={job.company}
                  placeholder="Google"
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

            </div>

            {/* Location */}

            <div>

              <label className="block text-slate-300 font-semibold mb-2">
                Location
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="location"
                  value={job.location}
                  placeholder="Pune"
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

            </div>

            {/* Salary */}

            <div>

              <label className="block text-slate-300 font-semibold mb-2">
                Salary
              </label>

              <div className="relative">

                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="salary"
                  value={job.salary}
                  placeholder="₹8 LPA"
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

            </div>

            {/* Description */}

            <div>

              <label className="block text-slate-300 font-semibold mb-2">
                Job Description
              </label>

              <div className="relative">

                <FileText
                  size={18}
                  className="absolute left-4 top-5 text-slate-400"
                />

                <textarea
                  name="description"
                  value={job.description}
                  placeholder="Describe the role, required skills, responsibilities and experience..."
                  rows={6}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl py-3 pl-12 pr-4 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

            </div>

          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Publish Job
          </button>

        </motion.form>

      </div>
    </div>
  );
}

export default PostJob;