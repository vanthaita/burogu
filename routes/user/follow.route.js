
const express = require('express');
const router = express.Router();
const follow = require('../../controllers/user/follow/follow.controller');
router.post('/', follow.handleFollow)

module.exports = router;
