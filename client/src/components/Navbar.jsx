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
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2"
          >
            <BriefcaseBusiness size={28} />
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
              JobPortal
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-lg font-medium">
            <Link
              to="/dashboard"
              className="hover:text-cyan-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/jobs"
              className="hover:text-cyan-400 transition"
            >
              Jobs
            </Link>

            <Link
              to="/profile"
              className="hover:text-cyan-400 transition"
            >
              Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
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
          <div className="md:hidden flex flex-col gap-4 pb-4 text-lg font-medium">
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="hover:text-cyan-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/jobs"
              onClick={() => setMenuOpen(false)}
              className="hover:text-cyan-400 transition"
            >
              Jobs
            </Link>

            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="hover:text-cyan-400 transition"
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