import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <RecruiterNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 flex justify-center">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
            Post New Job
          </h1>

          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job Title
              </label>

              <input
                name="title"
                value={job.title}
                placeholder="e.g. Frontend Developer"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Company Name
              </label>

              <input
                name="company"
                value={job.company}
                placeholder="e.g. Google"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Location
              </label>

              <input
                name="location"
                value={job.location}
                placeholder="e.g. Pune"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Salary
              </label>

              <input
                name="salary"
                value={job.salary}
                placeholder="e.g. ₹8 LPA"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job Description
              </label>

              <textarea
                name="description"
                value={job.description}
                placeholder="Describe the role, skills required, experience, responsibilities, etc."
                rows="6"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition duration-300"
          >
            Publish Job
          </button>
        </motion.form>
      </div>
    </div>
  );
}

export default PostJob;