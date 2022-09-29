const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Post = require("./models/Post");

mongoose.connect("mongodb://localhost:27017/DB");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use('/profilpic', express.static('profilpic'));
//register login
app.post("/register", (req, res, next) => {
  console.log(req.body);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  newUser.save((err) => {
    if (err) {
      return res.status(400).json({});
    }
    return res.status(200).json({
      title: "Connection success",
    });
  });
});
app.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(500).json({
        title: "server error",
        error: err,
      });
    if (!user) {
      return res.status(401).json({
        error: "Utilisateur inconnu",
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        error: "mot de passe incorrect",
      });
    }
    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({
      token: token,
    });
  });
});
//userinf
app.get("/user", (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.status(401).json;
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "user grabbed",
        user: {
          userId:decoded.userId,
          email: user.email,
          name: user.name,
          profilPic: user.profilPic,
          admin: user.admin,
        },
      });
    });
  });
});

///Post
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  }),
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

app.post("/postform", (req, res, next) => {
  console.log(req.body.profilPic)
  const newPost = new Post({
    profilPic: req.body.profilPic,
    username: req.body.username,
    img: `${req.protocol}://${req.get('host')}/uploads/${req.body.img}`,
    text: req.body.text,
    email: req.body.email
  });
  newPost.save((err) => {
    if (err) {
      return res.status(400).json({});
    }
    return res.status(200).json({
      title: "Post crée",
    });
  });
});

app.post("/updatePost", (req, res, next) => {
  const postObject= new Post({
    img: `${req.protocol}://${req.get('host')}/uploads/${req.body.img}`,
    text: req.body.text,
  });
Post.updateOne(
{ _id: req.params.id },
{ ...postObject, _id: req.params.id }
)
.then(() => res.status(200).json({ message: "Post modifié" }))
.catch((error) => res.status(400).json({ error }));
});

//display
app.get("/getposts",  (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/getpost",  (req, res, next) => {
  Post.findOne()
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
});

app.delete("/post/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id })
  .then((post) => {
      Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "post supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
  });

app.post("/likePost",  (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    console.log(req.params)
    let userId = req.body.userId; 
    if (req.body.like == 1) {
      post.likes += 1;
      post.usersLiked.push(userId);
    } else if (req.body.like == 0 && post.usersLiked.includes(userId)) {
      post.likes -= 1;
      post.usersLiked.remove(userId);
    }
    post
      .save()
      .then(() => res.status(201).json({ message: "great success" }))
      .catch((error) => res.status(400).json({ error }));
  });
});

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("server running on port " + port);
});
