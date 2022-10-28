const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/userInfo",auth, userCtrl.userInfo);
router.post("/:id", auth, multer, userCtrl.updateUser)

module.exports = router;