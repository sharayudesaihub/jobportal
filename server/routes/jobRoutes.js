const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getMyJobs,
  applyJob,
  getApplicants,
  getApplicantsByJob,
  dashboardStats,
  deleteJob,
  updateJob
} = require("../controllers/jobController");

// ===============================
// Recruiter - Post Job
// ===============================
router.post(
  "/",
  authMiddleware,
  createJob
);

// ===============================
// Recruiter - My Jobs
// ===============================
router.get(
  "/my-jobs",
  authMiddleware,
  getMyJobs
);

// ===============================
// Public - Get All Jobs
// ===============================
router.get(
  "/",
  getJobs
);

// ===============================
// Applicant - Apply Job
// ===============================
router.post(
  "/apply/:id",
  authMiddleware,
  applyJob
);

// ===============================
// Recruiter - View All Applicants
// ===============================
router.get(
  "/applications",
  authMiddleware,
  getApplicants
);

// ===============================
// Recruiter - View Applicants of One Job
// ===============================
router.get(
  "/applications/:jobId",
  authMiddleware,
  getApplicantsByJob
);

// ===============================
// Recruiter Dashboard Stats
// ===============================
router.get(
  "/stats",
  authMiddleware,
  dashboardStats
);

// ===============================
// Recruiter - Update Job
// ===============================
router.put(
  "/:id",
  authMiddleware,
  updateJob
);

// ===============================
// Recruiter - Delete Job
// ===============================
router.delete(
  "/:id",
  authMiddleware,
  deleteJob
);

module.exports = router;