

const express = require("express");
const { createFeedback, getFeedbacks } = require("../controllers/feedbackController");

const router = express.Router();

// ✅ Route to submit feedback
router.post("/", createFeedback);

// ✅ Route to get only the logged-in user's feedback
router.get("/", getFeedbacks);

module.exports = router;
