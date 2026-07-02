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
  PlusCircle
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

      const res = await API.get(
        "/jobs/my-jobs",
        {
          headers: {
            Authorization: token
          }
        }
      );

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

      await API.delete(
        `/jobs/${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

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

      <div className="max-w-7xl mx-auto p-8">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold text-white">

            My Jobs

          </h1>

          <button
            onClick={() => navigate("/post-job")}
            className="bg-white text-purple-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition"
          >

            <PlusCircle size={20} />

            Post New Job

          </button>

        </div>

        {

          jobs.length === 0 ? (

            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-16 text-center text-white shadow-xl">

              <h2 className="text-3xl font-bold">

                No Jobs Posted Yet

              </h2>

              <p className="mt-4 text-lg">

                Start by posting your first job.

              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {

                jobs.map((job) => (

                  <div
                    key={job._id}
                    className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl p-6 text-white hover:scale-105 transition"
                  >

                    <h2 className="text-2xl font-bold mb-5">

                      {job.title}

                    </h2>

                    <div className="space-y-3">

                      <div className="flex items-center gap-2">

                        <Building2 size={18} />

                        <span>{job.company}</span>

                      </div>

                      <div className="flex items-center gap-2">

                        <MapPin size={18} />

                        <span>{job.location}</span>

                      </div>

                      <div className="flex items-center gap-2">

                        <IndianRupee size={18} />

                        <span>{job.salary}</span>

                      </div>

                    </div>

                    <p className="mt-5 text-white/90 leading-7">

                      {job.description}

                    </p>

                    <div className="grid grid-cols-3 gap-3 mt-8">

                      <button
                        onClick={() => navigate(`/edit-job/${job._id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 py-3 rounded-xl flex justify-center items-center"
                      >

                        <Pencil size={20} />

                      </button>

                      <button
                        onClick={() => deleteJob(job._id)}
                        className="bg-red-600 hover:bg-red-700 py-3 rounded-xl flex justify-center items-center"
                      >

                        <Trash2 size={20} />

                      </button>

                      <button
  onClick={() => {
    console.log(job._id);
    navigate(`/applications/${job._id}`);
  }}
  className="bg-green-600 hover:bg-green-700 py-3 rounded-xl flex justify-center items-center"
>
  <Users size={20} />
</button>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

    </div>

  );

}

export default MyJobs;