
const express = require('express');
const router = express.Router();
const vote = require('../../controllers/vote/vote.controller');
router.post('/', vote.handleVote)

module.exports = router;
