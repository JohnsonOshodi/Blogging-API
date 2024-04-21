//import express
const express = require('express');

//import Post controller
const postController = require("../controller/post.controller");

//import authetication middleware
const authController = require('../auth/user.auth')

//create router 
const router = express.Router();

//API endpoint structure
router.get('/', postController.getAllPublishedPost);
router.get("/:postId", postController.getASinglePublishedPost);
router.put("/:postId", authController.authenticate, postController.updateAPost); 
router.delete("/:postId", authController.authenticate, postController.deleteAPost); 
module.exports = router;