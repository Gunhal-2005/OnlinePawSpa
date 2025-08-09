const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

exports.getFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Fetch all feedbacks, newest first
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching feedbacks', error });
    }
  };
  