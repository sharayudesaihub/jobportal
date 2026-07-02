import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import RecruiterNavbar from "../components/RecruiterNavbar";

import {
  User,
  Mail,
  Calendar
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
            Authorization: token
          }
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

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-white mb-10">

          Applicants

        </h1>

        {

          applications.length === 0 ?

          (

            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-16 text-center text-white">

              <h2 className="text-3xl">

                No Applicants Yet

              </h2>

            </div>

          )

          :

          (

            <div className="grid md:grid-cols-2 gap-8">

              {

                applications.map((app)=>(

                  <div

                    key={app._id}

                    className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 text-white shadow-xl"

                  >

                    <div className="flex items-center gap-3 mb-4">

                      <User />

                      <h2 className="text-2xl font-bold">

                        {app.applicantId.name}

                      </h2>

                    </div>

                    <div className="flex items-center gap-3 mb-4">

                      <Mail />

                      {app.applicantId.email}

                    </div>

                    <div className="flex items-center gap-3">

                      <Calendar />

                      {new Date(app.createdAt).toLocaleDateString()}

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

export default Applicants;