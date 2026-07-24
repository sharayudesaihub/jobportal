import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Briefcase,
  BriefcaseBusiness,
  PlusCircle,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function RecruiterNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const activeClass = (path) =>
    location.pathname === path
      ? "text-blue-400 font-semibold"
      : "text-slate-300 hover:text-blue-400";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 flex justify-between items-center">

          {/* Logo */}
          <div
            onClick={() => navigate("/recruiter-dashboard")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <BriefcaseBusiness
              size={28}
              className="text-blue-500 group-hover:text-blue-400 transition-colors duration-300"
            />

            <h1 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              JobPortal
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/recruiter-dashboard"
              className={`flex items-center gap-2 transition duration-300 ${activeClass(
                "/recruiter-dashboard"
              )}`}
            >
              <Briefcase size={20} />
              Dashboard
            </Link>

            <Link
              to="/post-job"
              className={`flex items-center gap-2 transition duration-300 ${activeClass(
                "/post-job"
              )}`}
            >
              <PlusCircle size={20} />
              Post Job
            </Link>

            <Link
              to="/my-jobs"
              className={`flex items-center gap-2 transition duration-300 ${activeClass(
                "/my-jobs"
              )}`}
            >
              <FileText size={20} />
              My Jobs
            </Link>

          </div>

          {/* Desktop User */}
          <div className="hidden md:flex items-center gap-5">

            <span className="text-slate-300 font-medium">
              👋 {user?.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition duration-300"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-300 hover:text-blue-400 transition-colors duration-300"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 mb-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">

            <Link
              to="/recruiter-dashboard"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-5 py-4 transition ${activeClass(
                "/recruiter-dashboard"
              )} hover:bg-slate-800`}
            >
              <Briefcase size={20} />
              Dashboard
            </Link>

            <Link
              to="/post-job"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-5 py-4 transition ${activeClass(
                "/post-job"
              )} hover:bg-slate-800`}
            >
              <PlusCircle size={20} />
              Post Job
            </Link>

            <Link
              to="/my-jobs"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-5 py-4 transition ${activeClass(
                "/my-jobs"
              )} hover:bg-slate-800`}
            >
              <FileText size={20} />
              My Jobs
            </Link>

            <div className="border-t border-slate-800 px-5 py-4">

              <p className="text-slate-300 mb-4 font-medium">
                👋 {user?.name}
              </p>

              <button
                onClick={logout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition duration-300"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default RecruiterNavbar;