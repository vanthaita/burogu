
const express = require('express');
const router = express.Router();
const register = require('../controllers/auth/register.controller');
router.post('/', register.handleRegister)

module.exports = router;
