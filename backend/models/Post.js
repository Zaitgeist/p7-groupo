const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  profilPic: String,
  userId: String,
  username: String,
  img: String,
  text: String,
});

const Post = mongoose.model("Post", postSchema, "Post");
module.exports = Post;
