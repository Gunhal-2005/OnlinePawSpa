

// const mongoose = require("mongoose");

// const feedbackSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Feedback = mongoose.model("Feedback", feedbackSchema);
// module.exports = Feedback;

// const mongoose = require("mongoose");

// const FeedbackSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Feedback", FeedbackSchema);

const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
