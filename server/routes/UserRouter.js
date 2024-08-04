const express = require('express');
const { createUser, loginUser, changePassword, createTableList, getUserData } = require('../controller/User');
const VerifyToken = require('../middlewere/VerifyToken');
const router = express.Router();

router.post("/signup", createUser)
router.post("/login", loginUser)
router.put("/changePassword/:id", changePassword)
router.post("/createTableList/:id", createTableList)
router.get("/getUserData", VerifyToken, getUserData)

module.exports = router;
