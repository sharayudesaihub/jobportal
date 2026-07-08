import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import RecruiterNavbar from "../components/RecruiterNavbar";

import {
  User,
  Mail,
  Calendar,
} from "lucide-react";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplicants();
  }, []);

  const loadApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/jobs/applications/${jobId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <RecruiterNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Applicants
          </h1>

          <p className="text-white/80 mt-3 text-base sm:text-lg">
            View all candidates who have applied for this job.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-10 sm:p-16 text-center text-white shadow-2xl">
            <User
              size={60}
              className="mx-auto mb-5"
            />

            <h2 className="text-2xl sm:text-3xl font-bold">
              No Applicants Yet
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/90">
              Applicants will appear here once someone applies for this job.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white shadow-2xl hover:scale-[1.02] transition duration-300"
              >
                {/* Applicant Name */}

                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <User size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-white/70">
                      Applicant
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold break-words">
                      {app.applicantId.name}
                    </h2>
                  </div>
                </div>

                {/* Email */}

                <div className="flex items-start gap-3 mb-5">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-white/70">
                      Email
                    </p>

                    <p className="break-all">
                      {app.applicantId.email}
                    </p>
                  </div>
                </div>

                {/* Applied Date */}

                <div className="flex items-start gap-3">
                  <div className="bg-green-600 p-3 rounded-full">
                    <Calendar size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-white/70">
                      Applied On
                    </p>

                    <p>
                      {new Date(
                        app.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applicants;