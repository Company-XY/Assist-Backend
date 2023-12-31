const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/fileUpload");
const {
  home,
  getAll,
  authUser,
  registerClient,
  registerFreelancer,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAnotherProfile,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", home);
router.get("/public/secured/users", getAll);
router.post("/register/client", registerClient);
router.post("/register/freelancer", registerFreelancer);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router
  .route("/user/:id")
  .get(getUserProfile)
  .patch(
    upload.fields([
      { name: "avatar", maxCount: 1 }, // Single avatar file
      { name: "files", maxCount: 10 }, // Up to 10 sample work files
    ]),
    updateUserProfile
  );
router.get("/profile/other/:id", getAnotherProfile);

module.exports = router;
