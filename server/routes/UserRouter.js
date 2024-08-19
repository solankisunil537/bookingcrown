const express = require('express');
const { createUser, loginUser, changePassword, getUserData, getAllUsers, updateUser, updateUserByAdmin } = require('../controller/User');
const VerifyToken = require('../middlewere/VerifyToken');
const router = express.Router();

router.post("/signup", createUser)
router.post("/login", loginUser)
router.put("/changePassword", VerifyToken, changePassword)
router.put("/updateUserDetails", VerifyToken, updateUser)
router.get("/getUserData", VerifyToken, getUserData)
router.get("/getAllUsers", VerifyToken, getAllUsers)
router.put("/updateUserBType/:id", VerifyToken, updateUserByAdmin)

module.exports = router;
