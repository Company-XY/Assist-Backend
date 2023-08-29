const express = require("express");
const protect = require("../middlewares/authMiddleware");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post("/:userId/deposit", protect, paymentController.depositFunds);
router.post(
  "/:senderId/transfer/:recipientId",
  protect,
  paymentController.transferFunds
);
router.post("/:userId/withdraw", protect, paymentController.withdrawToPayPal);

module.exports = router;
