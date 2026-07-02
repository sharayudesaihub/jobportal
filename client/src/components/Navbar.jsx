import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-slate-950 text-white px-8 py-4 shadow-lg flex justify-between items-center">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <BriefcaseBusiness size={28} />
        <h1 className="text-2xl font-bold tracking-wide">
          JobPortal
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex gap-8 text-lg font-medium">
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
    </nav>
  );
}

export default Navbar;