
const express = require('express');
const router = express.Router();
const logout = require('../controllers/auth/logout.controller');
router.post('/', logout.handleLogout)

module.exports = router;
