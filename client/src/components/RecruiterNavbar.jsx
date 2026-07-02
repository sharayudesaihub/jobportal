import { Link, useNavigate, useLocation } from "react-router-dom";
import { Briefcase, PlusCircle, FileText, LogOut } from "lucide-react";

function RecruiterNavbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  const activeClass = (path) =>
    location.pathname === path
      ? "text-yellow-300 font-bold"
      : "text-white hover:text-yellow-300";

  return (

    <nav className="bg-white/10 backdrop-blur-xl shadow-lg px-8 py-4 flex justify-between items-center">

      <h1
        className="text-3xl font-bold text-white cursor-pointer"
        onClick={() => navigate("/recruiter-dashboard")}
      >
        JobPortal
      </h1>

      <div className="flex items-center gap-8">

        <Link
          to="/recruiter-dashboard"
          className={`flex items-center gap-2 ${activeClass("/recruiter-dashboard")}`}
        >
          <Briefcase size={20} />
          Dashboard
        </Link>

        <Link
          to="/post-job"
          className={`flex items-center gap-2 ${activeClass("/post-job")}`}
        >
          <PlusCircle size={20} />
          Post Job
        </Link>

        <Link
          to="/my-jobs"
          className={`flex items-center gap-2 ${activeClass("/my-jobs")}`}
        >
          <FileText size={20} />
          My Jobs
        </Link>


      </div>

      <div className="flex items-center gap-5">

        <span className="text-white font-semibold">

          👋 {user?.name}

        </span>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </nav>

  );

}

export default RecruiterNavbar;