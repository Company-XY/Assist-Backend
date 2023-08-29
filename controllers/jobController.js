const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");
const Bid = require("../models/bidModel");

const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getUserJobs = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const jobs = await Job.find({ user: userId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const createJob = asyncHandler(async (req, res) => {
  try {
    const { title, description, user_email, skills, budget, duration } =
      req.body;

    if (!user_email) {
      return res.status(400).json({ message: "User email not found." });
    }

    const files = req.files.map((file) => ({
      title: file.originalname,
      fileUrl: file.path,
    }));

    const newJob = await Job.create({
      user_email,
      title,
      description,
      skills,
      budget,
      duration,
      files,
    });

    res.status(201).json(newJob);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
});

const getOneJob = asyncHandler(async (req, res) => {
  try {
    const oneJob = await Job.findById(req.params.id);
    res.status(200).json(oneJob);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const updateJob = asyncHandler(async (req, res) => {
  try {
    const { title, description, skills, budget, duration } = req.body;

    const updatedFields = {
      title,
      description,
      skills,
      budget,
      duration,
    };

    if (req.files && req.files.length > 0) {
      updatedFields.files = req.files.map((file) => ({
        title: file.originalname,
        fileUrl: file.path,
      }));
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const deleteJob = asyncHandler(async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted Successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const getJobBids = asyncHandler(async (req, res) => {
  try {
    const jobBids = await Bid.find({ job: req.params.id });
    res.status(200).json(jobBids);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  getAllJobs,
  getUserJobs,
  createJob,
  getOneJob,
  updateJob,
  deleteJob,
  getJobBids,
};
