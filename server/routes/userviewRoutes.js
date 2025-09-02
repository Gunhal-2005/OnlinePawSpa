

const express = require("express");
const router = express.Router();
const { getUserAppointments, cancelAppointment } = require("../controllers/userviewController");
const authenticateUser = require("../middleware/authenticateUser");

// ✅ Get all appointments for the logged-in user
router.get("/user", authenticateUser, getUserAppointments);

// ✅ Cancel an appointment by ID
router.patch("/:id/cancel", authenticateUser, cancelAppointment);

module.exports = router;
