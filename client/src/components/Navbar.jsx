import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 group"
          >
            <BriefcaseBusiness
              size={28}
              className="text-blue-500 group-hover:text-blue-400 transition-colors duration-300"
            />

            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white group-hover:text-blue-400 transition-colors duration-300">
              JobPortal
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-lg font-medium">

            <Link
              to="/dashboard"
              className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
            >
              Dashboard
            </Link>

            <Link
              to="/jobs"
              className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
            >
              Jobs
            </Link>

            <Link
              to="/profile"
              className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
            >
              Profile
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-blue-400 transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden mt-2 mb-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">

            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 text-slate-300 hover:bg-slate-800 hover:text-blue-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/jobs"
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 text-slate-300 hover:bg-slate-800 hover:text-blue-400 transition"
            >
              Jobs
            </Link>

            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 text-slate-300 hover:bg-slate-800 hover:text-blue-400 transition"
            >
              Profile
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;