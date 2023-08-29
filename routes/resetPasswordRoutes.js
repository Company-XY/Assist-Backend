const express = require("express");
const {
  resetPassword,
  sentResetLink,
} = require("../controllers/resetPasswordController");

const router = express.Router();

router.post("/reset", sentResetLink);
router.post("/reset/password", resetPassword);

module.exports = router;
