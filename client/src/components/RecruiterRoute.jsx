import { Navigate } from "react-router-dom";

function RecruiterRoute({ children }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role !== "recruiter") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RecruiterRoute;