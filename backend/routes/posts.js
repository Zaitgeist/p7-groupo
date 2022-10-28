const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");
const multer = require("../middleware/multer-config");
const auth = require('../middleware/auth');



router.get("/",auth, postsCtrl.getAllPosts);
router.get("/:id",auth, postsCtrl.getOnePost);
router.post("/",auth, multer, postsCtrl.createPost);
router.post("/update/:id",auth, multer, postsCtrl.updatePost);
router.delete("/:id",auth, multer, postsCtrl.deletePost);
router.post("/:id",auth, postsCtrl.likePost);

module.exports = router;