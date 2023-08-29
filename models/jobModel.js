const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user_email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    files: [
      {
        title: String,
        fileUrl: String,
      },
    ],
    skills: [
      {
        value: String,
        label: String,
      },
    ],
    duration: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
