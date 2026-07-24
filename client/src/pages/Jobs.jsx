import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Building,
  MapPin,
  IndianRupee,
  Briefcase,
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Jobs({
  darkMode,
  setDarkMode,
}) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const applyJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/jobs/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Applied Successfully 🚀");
    } catch (error) {
      alert("Already Applied");
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Find Your Dream Job 🚀
          </h1>

          <p className="text-slate-400 mt-3 text-base sm:text-lg">
            Discover exciting opportunities and apply with just one click.
          </p>
        </motion.div>

        {/* Search */}

        <div className="relative mb-8 w-full">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by title, company or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-1/2 pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 outline-none shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          />

        </div>

        {/* Total Jobs */}

        <div className="mb-8">

          <div className="inline-flex items-center bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl px-5 py-3 shadow-lg">

            <span className="text-slate-300 font-medium">
              Total Jobs Found:
            </span>

            <span className="ml-3 text-blue-400 text-xl font-bold">
              {filteredJobs.length}
            </span>

          </div>

        </div>

        {/* No Jobs */}

        {filteredJobs.length === 0 ? (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/80 backdrop-blur-md rounded-3xl p-12 text-center border border-slate-700 shadow-xl"
          >

            <Briefcase
              size={60}
              className="mx-auto mb-5 text-blue-400"
            />

            <h2 className="text-2xl font-bold text-white">
              No Jobs Found
            </h2>

            <p className="text-slate-400 mt-3">
              Try searching with a different keyword.
            </p>

          </motion.div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredJobs.map((job) => (

              <motion.div
                key={job._id}
                whileHover={{
                  y: -8,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-slate-700 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300 flex flex-col"
              >

                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-5">

                  <Briefcase
                    size={28}
                    className="text-white"
                  />

                </div>

                <h2 className="text-2xl font-bold text-white mb-6 break-words">
                  {job.title}
                </h2>

                <div className="flex items-center gap-3 mb-4 text-slate-300">

                  <Building
                    size={18}
                    className="text-blue-400"
                  />

                  <p className="break-words">
                    {job.company}
                  </p>

                </div>

                <div className="flex items-center gap-3 mb-4 text-slate-300">

                  <MapPin
                    size={18}
                    className="text-green-400"
                  />

                  <p className="break-words">
                    {job.location}
                  </p>

                </div>

                <div className="flex items-center gap-3 mb-6 text-slate-300">

                  <IndianRupee
                    size={18}
                    className="text-yellow-400"
                  />

                  <p>{job.salary}</p>

                </div>

                <div className="mt-auto">

                  <button
                    onClick={() => applyJob(job._id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    Apply Now
                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default Jobs;