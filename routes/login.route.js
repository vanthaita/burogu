
const express = require('express');
const router = express.Router();
const login = require('../controllers/auth/auth.controller');
router.post('/', login.handleLogin)

module.exports = router;
