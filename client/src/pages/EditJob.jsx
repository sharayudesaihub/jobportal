import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import RecruiterNavbar from "../components/RecruiterNavbar";

function EditJob() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/jobs/my-jobs", {
        headers: {
          Authorization: token,
        },
      });

      const job = res.data.find((j) => j._id === id);

      if (job) {
        setFormData(job);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(`/jobs/${id}`, formData, {
        headers: {
          Authorization: token,
        },
      });

      alert("Job Updated Successfully");

      navigate("/my-jobs");
    } catch (error) {
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <RecruiterNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
            Edit Job
          </h1>

          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Job Title"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Company
              </label>

              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Location
              </label>

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Salary
              </label>

              <input
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Salary"
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Job Description"
                rows={6}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition duration-300"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;