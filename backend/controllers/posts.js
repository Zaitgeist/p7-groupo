const Post = require("../models/Post");
const Comment = require("../models/Comment");
const fs = require("fs"); //

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne()
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
  const post = req.file
    ? {
        ...req.body,
        img: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  const newPost = new Post({
    ...post,
  });
  newPost.save((err) => {
    if (err) {
      return res.status(400).json({});
    }
    return res.status(200).json({
      title: "Post crée",
    });
  });
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (post.img !== undefined) {
    const filename = post.img.split("/uploads")[1];
      fs.unlink(`uploads/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => Comment.where({ postId: req.params.id }).deleteMany())
          .catch((error) => res.status(400).json({ error }));
      });
    } else {
      Post.deleteOne({ _id: req.params.id })
        .then(() => Comment.where({ postId: req.params.id }).deleteMany())
        .catch((error) => res.status(400).json({ error }));
    }
  });
};

exports.updatePost = (req, res, next) => {
  const updatePost = req.file
    ? {
        ...req.body,
        img: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.findOneAndUpdate(
    { _id: req.params.id },
    { ...updatePost, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Post mis a jour" }))
    .catch((error) => res.status(400).json({ error }));
};

// like

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    let userId = req.body.userId;
    if (req.body.like == 1) {
      post.likes += 1;
      post.usersLiked.push(userId);
    } else if (req.body.like == 0 || post.usersLiked.includes(userId)) {
      post.likes -= 1;
      post.usersLiked.remove(userId);
    }
    post
      .save()
      .then(() => res.status(201).json({ message: "great success" }))
      .catch((error) => res.status(400).json({ error }));
  });
};
