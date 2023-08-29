const express = require("express");
const {
  getFreelancerBids,
  getBidStatus,
  updateBidStatus,
  placeBid,
} = require("../controllers/bidController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/fileUpload"); 

const router = express.Router();

// Route for fetching freelancer's bids
router.get("/freelancer-bids", protect, getFreelancerBids);

// Routes for managing bid status
router.get("/bid-status/:id", protect, getBidStatus);
router.put("/update-bid-status/:id", protect, updateBidStatus);

// Route for placing a bid on a job
router.post("/place-bid", protect, upload.array("files", 10), placeBid);

module.exports = router;
