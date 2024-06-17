
const express = require('express');
const router = express.Router();
const postComment = require('../../controllers/comment/post.comment');
router.post('/', postComment.handlePostComment)

module.exports = router;
