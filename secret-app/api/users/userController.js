const User = require("./userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


const getUsers = async (req, res) => {
    try {
     const data = await User.find({})
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
      const { name, email, password, isAdmin } = req.body;
      let userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ success:false,message: "User already exists" });  
      const user = await User.create({
        name,
        email,
        password,
        isAdmin,
      });
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
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

    res.json({
     success:true,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ success:false,error: err.message });
  }
};

module.exports = { registerUser, loginUser ,getUsers };
