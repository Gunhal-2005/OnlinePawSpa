const express = require('express');
const router = express.Router();
const { getFeedbacks } = require('../controllers/homeController');

// ✅ Route to fetch all feedbacks
router.get('/', getFeedbacks);

module.exports = router;
