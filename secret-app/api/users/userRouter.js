const express = require("express");
const { registerUser, loginUser,getUsers, updateAdmin } = require("./userController");

const router = express.Router();
router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/:id",updateAdmin);

module.exports = router;