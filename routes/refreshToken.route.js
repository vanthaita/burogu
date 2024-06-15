
const express = require('express');
const router = express.Router();
const refreshToken = require('../controllers/auth/refreshToken.controller');
router.get('/', refreshToken.handleRefreshToken)

module.exports = router;
