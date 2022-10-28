const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
require("dotenv").config();

exports.register = (req, res, next) => {
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
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // on cherche si le mail existe
    .then((user) => {
      if (!user) {
        // si le mail n'existe pas 401
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password) //  sinon on compare le mot de passe saisi et le mot de passe hashé enregistré
        .then((valid) => {
          if (!valid) {
            // si ca ne correspond pas 401
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          return res.status(200).json({
            // si cela correspond on renvoie l'id utilisateur et on le signe
            userId: user.id,
            token: jwt.sign(
              { userId: user._id },
              process.env.TOKEN, // le token est signé avec le secret dans notre fichier .env et le token expire dans une durée de 24h
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.userInfo = (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) return res.status(401).json;
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "user grabbed",
        user: {
          userId: decoded.userId,
          email: user.email,
          name: user.name,
          profilPic: user.profilPic,
          admin: user.admin,
        },
      });
    });
  });
};

exports.updateUser = (req, res, next) => {
  const updateUser = req.file
    ? {
        ...req.body,
        profilPic: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  User.findOneAndUpdate(
    { _id: req.params.id },
    { ...updateUser, _id: req.params.id }
  )
    .then(() =>
      Post.where({ userId: req.params.id }).updateMany({
        profilPic: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
      })
    )
    .then(() =>
      Comment.where({ userId: req.params.id }).updateMany({
        profilPic: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
      })
    )
    .then(() => res.status(200).json({ message: "Commentaire mis a jour" }))
    .catch((error) => res.status(400).json({ error }));
};
