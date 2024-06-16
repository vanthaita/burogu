
const express = require('express');
const router = express.Router();
const getPost = require('../../controllers/post/get.post.controller');
router.post('/', getPost.handleGetPost)

module.exports = router;
