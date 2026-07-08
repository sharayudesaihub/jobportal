import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Briefcase,
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
      ? "text-yellow-300 font-bold"
      : "text-white hover:text-yellow-300";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex justify-between items-center">
          {/* Logo */}

          <h1
            className="text-2xl sm:text-3xl font-bold text-white cursor-pointer"
            onClick={() => navigate("/recruiter-dashboard")}
          >
            JobPortal
          </h1>

          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/recruiter-dashboard"
              className={`flex items-center gap-2 transition ${activeClass(
                "/recruiter-dashboard"
              )}`}
            >
              <Briefcase size={20} />
              Dashboard
            </Link>

            <Link
              to="/post-job"
              className={`flex items-center gap-2 transition ${activeClass(
                "/post-job"
              )}`}
            >
              <PlusCircle size={20} />
              Post Job
            </Link>

            <Link
              to="/my-jobs"
              className={`flex items-center gap-2 transition ${activeClass(
                "/my-jobs"
              )}`}
            >
              <FileText size={20} />
              My Jobs
            </Link>
          </div>

          {/* Desktop User */}

          <div className="hidden md:flex items-center gap-5">
            <span className="text-white font-semibold">
              👋 {user?.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div className="md:hidden pb-5 flex flex-col gap-5">
            <Link
              to="/recruiter-dashboard"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 ${activeClass(
                "/recruiter-dashboard"
              )}`}
            >
              <Briefcase size={20} />
              Dashboard
            </Link>

            <Link
              to="/post-job"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 ${activeClass(
                "/post-job"
              )}`}
            >
              <PlusCircle size={20} />
              Post Job
            </Link>

            <Link
              to="/my-jobs"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 ${activeClass(
                "/my-jobs"
              )}`}
            >
              <FileText size={20} />
              My Jobs
            </Link>

            <div className="border-t border-white/20 pt-4">
              <p className="text-white mb-4 font-semibold">
                👋 {user?.name}
              </p>

              <button
                onClick={logout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 transition"
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