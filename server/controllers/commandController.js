const Feedback = require("../models/Feedback");

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("userId", "email") // only bring the email field from user
      .sort({ createdAt: -1 });    // optional: sort newest first

    // Map to include email directly (if your frontend expects `fb.email`)
    const formattedFeedbacks = feedbacks.map((fb) => ({
      _id: fb._id,
      email: fb.userId?.email || "Unknown",
      content: fb.content,
      createdAt: fb.createdAt,
    }));

    res.status(200).json(formattedFeedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
};

module.exports = { getAllFeedbacks };


