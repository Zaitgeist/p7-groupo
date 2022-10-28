const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comments");

//on specifie le fichier .env
require('dotenv').config();

const uri = process.env.mongo_uri; // on déclare la variable dans notre fichier .env

mongoose.connect(uri)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/uploads', express.static('uploads'));
app.use('/profilpic', express.static('profilpic'));

app.use("/post", postsRoutes);
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);


module.exports = app;