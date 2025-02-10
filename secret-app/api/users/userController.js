const User = require("./userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


const getUsers = async (req, res) => {
    try {
     const data = await User.find({}, { password: 0 });
             res.status(200).json({
                 success: true,
                 data: data
             })
    } catch (error) {
      res.status(500).json({ success:false,message: "Error fetching users", error });
    }
  };
  

  const registerUser = async (req, res) => {
    try {
      const { name, email, password} = req.body;
      let userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ success:false,message: "User already exists" });  
      const user = await User.create({
        name,
        email,
        password,
        isAdmin:false,
      });
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin:false,
      });
    } catch (err) {
      res.status(500).json({ success:false,error: err.message });
    }
  };

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({  success:false ,message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({  success:false ,message: "Invalid email or password" });
    const data = {email: user.email , name: user.name ,isAdmin: user.isAdmin};
    const token = generateToken(user.email,user.isAdmin);
    res.json({ success:true,data,token});
  } catch (err) {
    res.status(500).json({ success:false,error: err.message });
  }
};
const updateAdmin = async (req, res) => {
    const {isAdmin} = req.body;
    const { id } = req.params; 
  try {
    const result = await User.findByIdAndUpdate(id, { isAdmin }, { new: true, runValidators: true });
    if (!result) return res.status(404).json({ success:false ,message: "User not found" });
    else res.status(200).json({ success:true ,message: "User updated successfully", data: {email: result.email , name: result.name} });
    } catch (error) {
    res.status(500).json({ success:false ,message: "Error updating user", error });
    }}; 
module.exports = { registerUser , loginUser , getUsers, updateAdmin };
