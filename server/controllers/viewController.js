// // controllers/viewController.js
// const Appointment = require('../models/Appointment');

// // Get all appointments
// const getAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find();
//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update appointment status
// const updateAppointmentStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!['Booked', 'Accepted', 'Rejected'].includes(status)) {
//     return res.status(400).json({ message: 'Invalid status' });
//   }

//   try {
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );
//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { getAppointments, updateAppointmentStatus };

// const Appointment = require('../models/Appointment');

// // Get all appointments
// exports.getAllAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find();
//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching appointments', error });
//   }
// };

// // Update appointment status
// exports.updateAppointmentStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!updatedAppointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     res.status(200).json({ message: 'Appointment status updated', updatedAppointment });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating status', error });
//   }
// };
const Appointment = require('../models/Appointment'); // Import the Appointment model

// ✅ Get all appointments (admin only)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('user', 'name email');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Update appointment status (admin only)
const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = status;
    await appointment.save();

    res.json({ message: 'Status updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllAppointments, updateAppointmentStatus }; // ✅ Ensure these are exported
