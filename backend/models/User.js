const mongoose = require("mongoose");
const mongooseValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    unique: true,
    type: String,
  },
  profilPic: {
    type: String,
    default: "http://localhost:5000/profilpic/defaultpp.png",
  },
  email: {
    unique: true,
    type: String,
  },
  password: String,
  admin: String,
});

userSchema.plugin(mongooseValidator);
const User = mongoose.model("User", userSchema, "Users");
module.exports = User;
