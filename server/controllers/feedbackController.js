
// const Feedback = require("../models/Feedback");

// // @desc Get logged-in user's feedback
// // @route GET /api/feedbacks
// const getUserFeedbacks = async (req, res) => {
//   try {
//     const userId = req.user.userId; // Extract user ID from token
//     const feedbacks = await Feedback.find({ user: userId });

//     res.json(feedbacks);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching feedback", error });
//   }
// };

// // @desc Submit feedback
// // @route POST /api/feedbacks
// const submitFeedback = async (req, res) => {
//   try {
//     const { content } = req.body;
//     const userId = req.user.userId; // Extract user ID from token

//     if (!content) {
//       return res.status(400).json({ message: "Feedback cannot be empty" });
//     }

//     const feedback = new Feedback({ user: userId, content });
//     await feedback.save();

//     res.status(201).json({ message: "Feedback submitted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error submitting feedback", error });
//   }
// };

// module.exports = { getUserFeedbacks, submitFeedback };

// const jwt = require("jsonwebtoken");
// const Feedback = require("../models/Feedback");
// const User = require("../models/User");

// exports.createFeedback = async (req, res) => {
//   try {
//     const token = req.cookies.jwt; // Ensure the token name matches frontend
//     if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded.userId) return res.status(401).json({ message: "Unauthorized: Invalid token" });

//     const user = await User.findById(decoded.userId);
//     if (!user) return res.status(401).json({ message: "User not found" });

//     const { content } = req.body;
//     if (!content) return res.status(400).json({ message: "Feedback content is required" });

//     const feedback = new Feedback({
//       userId: user._id,
//       email: user.email, // Attach email from the database
//       content,
//     });

//     await feedback.save();
//     res.status(201).json({ message: "Feedback submitted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// exports.getFeedbacks = async (req, res) => {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded.userId) return res.status(401).json({ message: "Unauthorized: Invalid token" });

//     const user = await User.findById(decoded.userId);
//     if (!user) return res.status(401).json({ message: "User not found" });

//     const feedbacks = await Feedback.find({ userId: user._id }).sort({ createdAt: -1 });
//     res.status(200).json(feedbacks);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };const jwt = require("jsonwebtoken");

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
