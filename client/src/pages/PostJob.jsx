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
    description: ""
  });

  const handleChange = (e) => {

    setJob({
      ...job,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/jobs",
        job,
        {
          headers: {
            Authorization: token
          }
        }
      );

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

      <div className="flex justify-center items-center py-12 px-6">

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8"
        >

          <h1 className="text-3xl font-bold text-center mb-8">

            Post New Job

          </h1>

          <input
            name="title"
            value={job.title}
            placeholder="Job Title"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="company"
            value={job.company}
            placeholder="Company Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="location"
            value={job.location}
            placeholder="Location"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="salary"
            value={job.salary}
            placeholder="Salary"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            name="description"
            value={job.description}
            placeholder="Job Description"
            rows="6"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl font-bold hover:scale-105 transition"
          >

            Publish Job

          </button>

        </motion.form>

      </div>

    </div>

  );

}

export default PostJob;