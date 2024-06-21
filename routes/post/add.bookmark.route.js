
const express = require('express');
const router = express.Router();
const bookmark = require('../../controllers/post/add.bookmark.controller');
router.post('/', bookmark.handleBookmark)

module.exports = router;
