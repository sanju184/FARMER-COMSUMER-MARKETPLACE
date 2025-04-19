const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["farmer", "consumer", "admin"],
    default: "consumer",
  },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User",UserSchema);

module.exports = User;
