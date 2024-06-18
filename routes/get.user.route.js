
const express = require('express');
const router = express.Router();
const getUser = require('../controllers/user/get.user.controller');
router.post('/', getUser.handleGetUser)

module.exports = router;
