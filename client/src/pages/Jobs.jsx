import { useEffect, useState } from "react";

import {
  motion
} from "framer-motion";

import {
  Search,
  Building,
  MapPin,
  IndianRupee,
  Briefcase
} from "lucide-react";

import API from "../services/api";

import Navbar from "../components/Navbar";

function Jobs({
  darkMode,
  setDarkMode
}) {

  const [jobs, setJobs] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadJobs();

  }, []);

  const loadJobs = async () => {

    try {

      const res =
        await API.get("/jobs");

      setJobs(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const applyJob = async (jobId) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.post(
        `/jobs/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert(
        "Applied Successfully 🚀"
      );

    } catch (error) {

      alert(
        "Already Applied"
      );

    }

  };

  // Search filter on real jobs
  const filteredJobs =
    jobs.filter((job)=>

      job.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      ) ||

      job.company
      .toLowerCase()
      .includes(
        search.toLowerCase()
      ) ||

      job.location
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    );

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="p-8">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white mb-6">

          Find Your Dream Job 🚀

        </h1>

        {/* Search */}
        <div className="relative mb-8">

          <Search
            className="absolute left-4 top-3 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search by title, company, location..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
            className="w-full md:w-1/2 pl-12 p-3 rounded-xl shadow-lg"
          />

        </div>

        {/* Total jobs */}
        <p className="text-white mb-6 text-lg">

          Total Jobs Found:
          {filteredJobs.length}

        </p>

        {/* Jobs */}
        <div className="grid md:grid-cols-3 gap-6">

          {
            filteredJobs.map((job)=>(

              <motion.div
                key={job._id}
                whileHover={{
                  scale: 1.05
                }}
                className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-white"
              >

                <Briefcase
                  className="mb-4"
                />

                <h2 className="text-2xl font-bold mb-4">

                  {job.title}

                </h2>

                <div className="flex items-center gap-2 mb-3">

                  <Building size={18} />

                  <p>
                    {job.company}
                  </p>

                </div>

                <div className="flex items-center gap-2 mb-3">

                  <MapPin size={18} />

                  <p>
                    {job.location}
                  </p>

                </div>

                <div className="flex items-center gap-2 mb-4">

                  <IndianRupee size={18} />

                  <p>
                    {job.salary}
                  </p>

                </div>

                <button
                  onClick={() =>
                    applyJob(
                      job._id
                    )
                  }
                  className="w-full bg-white text-purple-700 font-bold p-3 rounded-xl hover:scale-105 transition"
                >

                  Apply Now

                </button>

              </motion.div>

            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Jobs;