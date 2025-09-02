


const Appointment = require("../models/Appointment");

// ✅ Get user-specific appointments
const getUserAppointments = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user data" });
    }

    const userId = req.user._id;
    const appointments = await Appointment.find({ userId });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Cancel an appointment by ID
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find appointment and update status
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment canceled successfully", appointment });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Ensure both functions are exported
module.exports = { getUserAppointments, cancelAppointment };
