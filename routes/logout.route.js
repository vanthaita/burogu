
const express = require('express');
const router = express.Router();
const logout = require('../controllers/auth/logout.controller');
router.get('/', logout.handleLogout)

module.exports = router;
