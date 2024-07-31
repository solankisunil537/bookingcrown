const express = require('express');
const { createUser, loginUser } = require('../controller/User');
const router = express.Router();

router.post("/signup", createUser)
router.post("/login", loginUser)

module.exports = router;
