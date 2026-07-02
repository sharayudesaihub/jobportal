import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/jobs/my-jobs",
        {
          headers: {
            Authorization: token
          }
        }
      );

      const job = res.data.find(
        (j) => j._id === id
      );

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
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/jobs/${id}`,
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Job Updated Successfully");

      navigate("/my-jobs");

    } catch (error) {

      alert("Update Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-[500px]"
      >

        <h1 className="text-3xl font-bold mb-6">

          Edit Job

        </h1>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3 rounded-lg mb-6"
          rows={5}
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >

          Update Job

        </button>

      </form>

    </div>

  );

}

export default EditJob;