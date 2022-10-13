const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postId: String,
  profilPic: String,
  userId: String,
  username: String,
  text: String,
  email: String,
});

const Comment = mongoose.model("Comment", commentSchema, "Comment");
module.exports = Comment;
