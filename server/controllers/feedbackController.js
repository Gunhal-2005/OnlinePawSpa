

const jwt = require("jsonwebtoken");
const Feedback = require("../models/Feedback");
const User = require("../models/User");

exports.createFeedback = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Feedback content is required" });

    const feedback = new Feedback({
      userId: user._id,
      email: user.email,
      content,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    // ✅ Fetch only the feedback for the logged-in user
    const feedbacks = await Feedback.find({ userId: user._id }).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
