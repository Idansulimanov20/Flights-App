const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true}};
    await mongoose.connect(uri, clientOptions);  
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
};

module.exports = connectDB;
