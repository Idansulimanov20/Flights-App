const express = require("express");
const { registerUser, loginUser,getUsers } = require("./users/userController");

const router = express.Router();
router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;