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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <RecruiterNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Applicants
          </h1>

          <p className="text-slate-400 mt-3 text-base sm:text-lg">
            View all candidates who have applied for this job.
          </p>
        </div>

        {applications.length === 0 ? (

          <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-10 sm:p-16 text-center shadow-xl">

            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-6">
              <User size={40} className="text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              No Applicants Yet
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-400">
              Applicants will appear here once someone applies for this job.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {applications.map((app) => (

              <div
                key={app._id}
                className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl p-6 shadow-xl hover:border-blue-500 hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300"
              >

                {/* Applicant */}

                <div className="flex items-center gap-4 mb-6">

                  <div className="bg-blue-600 p-3 rounded-full">
                    <User size={22} className="text-white" />
                  </div>

                  <div>

                    <p className="text-sm text-slate-400">
                      Applicant
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold text-white break-words">
                      {app.applicantId.name}
                    </h2>

                  </div>

                </div>

                {/* Email */}

                <div className="flex items-start gap-4 mb-6">

                  <div className="bg-slate-700 p-3 rounded-full">
                    <Mail size={20} className="text-blue-400" />
                  </div>

                  <div>

                    <p className="text-sm text-slate-400">
                      Email
                    </p>

                    <p className="text-slate-200 break-all">
                      {app.applicantId.email}
                    </p>

                  </div>

                </div>

                {/* Applied Date */}

                <div className="flex items-start gap-4">

                  <div className="bg-slate-700 p-3 rounded-full">
                    <Calendar size={20} className="text-green-400" />
                  </div>

                  <div>

                    <p className="text-sm text-slate-400">
                      Applied On
                    </p>

                    <p className="text-slate-200">
                      {new Date(app.createdAt).toLocaleDateString()}
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