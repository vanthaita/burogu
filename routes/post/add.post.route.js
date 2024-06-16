
const express = require('express');
const router = express.Router();
const addPost = require('../../controllers/post/add.post.controller');
router.post('/', addPost.handleAddPost)

module.exports = router;
