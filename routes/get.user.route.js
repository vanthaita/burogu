
const express = require('express');
const router = express.Router();
const getUser = require('../controllers/user/get.user');
router.get('/:id', getUser.handleGetUser)

module.exports = router;
