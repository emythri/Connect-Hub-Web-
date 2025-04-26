

const express = require("express");
const router = express.Router();
const { allUsers, registerUser, authUser } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, allUsers); // ✅ make sure `.get` uses `protect`
router.post("/login", authUser);

module.exports = router;

