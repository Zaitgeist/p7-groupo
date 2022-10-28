const Comment = require("../models/Comment");
//comment

exports.createComment = (req, res, next) => {
  const newComment = new Comment({
    postId: req.body.postId,
    profilPic: req.body.profilPic,
    userId: req.auth.userId,
    username: req.body.username,
    text: req.body.text,
    email: req.body.email,
  });
  newComment.save((err) => {
    if (err) {
      return res.status(400).json({});
    }
    return res.status(200).json({
      title: "Commentaire crée",
    });
  });
};

exports.getComment = (req, res, next) => {
  Comment.find({ postId: req.params.id })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id }).then((post) => {
    Comment.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "commentaire supprimé" }))
      .catch((error) => res.status(400).json({ error }));
  });
};
