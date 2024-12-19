const express = require("express");
const router = express.Router();
const { user, getUser,updateUserDetails } = require("../contoller/user.controller");

router.post("/addUser", user); // Add new user
router.get("/viewUser", getUser); // Fetch all users
router.put("/updateUser/:userId", updateUserDetails); // Update user by ID

module.exports = router;
