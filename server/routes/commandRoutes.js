const express = require("express");
const router = express.Router();
const { getAllFeedbacks } = require("../controllers/commandController");

// Admin route to fetch all feedbacks
router.get("/feedbacks", getAllFeedbacks);

module.exports = router;
