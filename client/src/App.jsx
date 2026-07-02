import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import RecruiterRoute from "./components/RecruiterRoute";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import Applicants from "./pages/Applicants";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/jobs"
          element={
            <Jobs
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <Profile
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/recruiter-dashboard"
          element={
            <RecruiterRoute>
              <RecruiterDashboard />
            </RecruiterRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <RecruiterRoute>
              <PostJob />
            </RecruiterRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <RecruiterRoute>
              <MyJobs />
            </RecruiterRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <RecruiterRoute>
              <EditJob />
            </RecruiterRoute>
          }
       />

       <Route
          path="/applications/:jobId"
          element={
            <RecruiterRoute>
              <Applicants />
            </RecruiterRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;