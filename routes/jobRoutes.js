const express = require("express");
const {
  getAllJobs,
  getUserJobs,
  createJob,
  getOneJob,
  updateJob,
  deleteJob,
  getJobBids,
} = require("../controllers/jobController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/fileUpload");

const router = express.Router();

// Routes for handling all jobs
router
  .route("/jobs")
  .get(getAllJobs)
  .post(protect, upload.array("files", 10), createJob);

// Routes for handling individual job
router
  .route("/jobs/:id")
  .get(protect, getOneJob)
  .put(protect, upload.array("files", 10), updateJob)
  .delete(protect, deleteJob);

// Route for fetching user-specific jobs
router.get("/user-jobs/:userEmail", protect, getUserJobs);

// Route for getting bids for a job
router.get("/job-bids/:id", getJobBids);

module.exports = router;
