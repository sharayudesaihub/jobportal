const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job"
    },

    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);