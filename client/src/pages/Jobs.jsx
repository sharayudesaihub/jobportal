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

  // Search filter on real jobs
  const filteredJobs = jobs.filter(
    (job) =>
      job.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      job.company
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      job.location
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Find Your Dream Job 🚀
          </h1>

          <p className="text-white/80 mt-3 text-base sm:text-lg">
            Discover exciting opportunities and apply with just one click.
          </p>
        </motion.div>

        {/* Search */}

        <div className="relative mb-8 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by title, company or location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full lg:w-1/2 pl-12 pr-4 py-3 rounded-xl shadow-xl outline-none text-gray-800"
          />
        </div>

        {/* Total Jobs */}

        <div className="mb-8">
          <p className="inline-flex items-center bg-white/15 backdrop-blur-lg border border-white/20 rounded-xl px-5 py-3 text-white font-semibold">
            Total Jobs Found:
            <span className="ml-2 text-yellow-300">
              {filteredJobs.length}
            </span>
          </p>
        </div>

        {/* No Jobs */}

        {filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 text-center border border-white/20"
          >
            <Briefcase
              size={60}
              className="mx-auto mb-5 text-white"
            />

            <h2 className="text-2xl font-bold text-white">
              No Jobs Found
            </h2>

            <p className="text-white/80 mt-3">
              Try searching with a different keyword.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl p-6 text-white border border-white/20 flex flex-col"
              >
                <Briefcase
                  className="mb-4"
                  size={34}
                />

                <h2 className="text-xl sm:text-2xl font-bold mb-5 break-words">
                  {job.title}
                </h2>

                <div className="flex items-center gap-2 mb-3">
                  <Building size={18} />
                  <p className="break-words">
                    {job.company}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={18} />
                  <p className="break-words">
                    {job.location}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <IndianRupee size={18} />
                  <p>{job.salary}</p>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() =>
                      applyJob(job._id)
                    }
                    className="w-full bg-white text-purple-700 font-bold py-3 rounded-xl hover:scale-105 hover:bg-yellow-300 transition-all duration-300"
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