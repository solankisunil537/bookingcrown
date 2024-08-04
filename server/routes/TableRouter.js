const express = require('express');
const { createTableList } = require('../controller/Tables');
const VerifyToken = require('../middlewere/VerifyToken');
const router = express.Router();

router.post("/createTableList", VerifyToken, createTableList)

module.exports = router;
