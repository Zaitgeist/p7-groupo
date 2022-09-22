const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    unique: true,
    type: String,
  },
  profilPic: {
    type: String,
    default: "http://localhost:5000/profilpic/FTSCd1d.jpg",
  },
  email: {
    unique: true,
    type: String,
  },
  password: String,
  admin: String,
});

const User = mongoose.model("User", userSchema, "Users");
module.exports = User;
