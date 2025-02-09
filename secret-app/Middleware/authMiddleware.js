const jwt = require("jsonwebtoken");
const User = require("../api/users/userModel");

const protect = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ sucsses : false ,message: "No token, authorization denied" });
    }

    token = token.split(" ")[1]; // להוציא את הטוקן מה-Header
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // בדיקת הטוקן

    req.user = await User.findById(decoded.id).select("-password"); // שליפת פרטי המשתמש ללא הסיסמה
    next();
  } catch (error) {
    res.status(401).json({sucsses : false, message: "Invalid token" });
  }
};

module.exports = { protect };
