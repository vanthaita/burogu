
const express = require('express');
const router = express.Router();
const getAll = require('../../controllers/post/get.all.post.controller');
router.get('/', getAll.handleGetAllPost)

module.exports = router;
