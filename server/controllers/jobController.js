const Job = require("../models/Job");
const Application = require("../models/Application");

// ==============================
// Create Job
// ==============================
exports.createJob = async (req, res) => {

  try {

    const {
      title,
      company,
      location,
      salary,
      description
    } = req.body;

    const job = new Job({
      title,
      company,
      location,
      salary,
      description,
      recruiterId: req.user.userId
    });

    await job.save();

    res.status(201).json({
      message: "Job posted successfully",
      job
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ==============================
// Get All Jobs
// ==============================
exports.getJobs = async (req, res) => {

  try {

    const jobs = await Job.find();

    res.json(jobs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ==============================
// Recruiter - My Jobs
// ==============================
exports.getMyJobs = async (req, res) => {

  try {

    const jobs = await Job.find({
      recruiterId: req.user.userId
    });

    res.json(jobs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ==============================
// Update Job
// ==============================
exports.updateJob = async (req, res) => {

  try {

    const job = await Job.findOne({
      _id: req.params.id,
      recruiterId: req.user.userId
    });

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Job updated successfully",
      job: updatedJob
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ==============================
// Delete Job
// ==============================
exports.deleteJob = async (req, res) => {

  try {

    const job = await Job.findOne({
      _id: req.params.id,
      recruiterId: req.user.userId
    });

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ==============================
// Apply Job
// ==============================
exports.applyJob = async (req, res) => {

  try {

    const jobId = req.params.id;

    const alreadyApplied = await Application.findOne({
      applicantId: req.user.userId,
      jobId
    });

    if (alreadyApplied) {

      return res.status(400).json({
        message: "Already applied"
      });

    }

    const application = new Application({
      applicantId: req.user.userId,
      jobId
    });

    await application.save();

    res.status(201).json({
      message: "Applied successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ==============================
// View All Applicants
// ==============================
exports.getApplicants = async (req, res) => {

  try {

    const applications = await Application.find()
      .populate("applicantId", "name email")
      .populate("jobId", "title company");

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ==============================
// View Applicants By Job
// ==============================
exports.getApplicantsByJob = async (req, res) => {

  try {

    const applications = await Application.find({
      jobId: req.params.jobId
    }).populate(
      "applicantId",
      "name email"
    );

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ==============================
// Dashboard Stats
// ==============================
exports.dashboardStats = async (req, res) => {

  try {

    const totalJobs = await Job.countDocuments({
      recruiterId: req.user.userId
    });

    const myJobs = await Job.find({
      recruiterId: req.user.userId
    });

    const jobIds = myJobs.map(job => job._id);

    const totalApplications =
      await Application.countDocuments({
        jobId: {
          $in: jobIds
        }
      });

    res.json({
      totalJobs,
      totalApplications
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ==============================
// Seeker Dashboard Stats
// ==============================
exports.seekerDashboardStats = async (req, res) => {

  try {

    // Total jobs available
    const totalJobs = await Job.countDocuments();

    // Jobs applied by current seeker
    const totalApplications =
      await Application.countDocuments({
        applicantId: req.user.userId
      });

    res.json({
      totalJobs,
      totalApplications
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};