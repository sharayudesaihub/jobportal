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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <RecruiterNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 flex justify-center">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl shadow-xl p-6 sm:p-8"
        >

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
            Edit Job
          </h1>

          <div className="space-y-6">

            <div>

              <label className="block text-slate-300 font-semibold mb-2">
                Job Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Job Title"
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            </div>

            <div>

              <label className="block text-slate-300 font-semibold mb-2">
                Company
              </label>

              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            </div>

            <div>

              <label className="block text-slate-300 font-semibold mb-2">
                Location
              </label>

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            </div>

            <div>

              <label className="block text-slate-300 font-semibold mb-2">
                Salary
              </label>

              <input
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Salary"
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            </div>

            <div>

              <label className="block text-slate-300 font-semibold mb-2">
                Job Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Job Description"
                rows={6}
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
              />

            </div>

          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Update Job
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditJob;