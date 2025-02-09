const jwt = require("jsonwebtoken");

const generateToken = (email,isAdmin) => {
  return jwt.sign({email,isAdmin}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
