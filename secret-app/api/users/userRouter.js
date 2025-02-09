const express = require("express");
const { registerUser, loginUser,getUsers, updateAdmin } = require("./userController");
const { protect } = require("../../Middleware/authMiddleware");

const router = express.Router();
router.get("/",protect, getUsers);
router.post("/register", registerUser);
router.post("/login",loginUser);
router.patch("/:id",protect,updateAdmin);

module.exports = router;