const express = require('express');
const { createPlan } = require('../controller/Plan');
const router = express.Router();

router.post("/createPlan/:id", createPlan)

module.exports = router;
