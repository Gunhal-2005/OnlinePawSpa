
// const Appointment = require('../models/Appointment');

// exports.createAppointment = async (req, res) => {
//   try {
//     const { ownerName, petName, service, price, appointmentDate, timeSlot, petImage, email, contactInfo, address } = req.body;

//     if (!ownerName || !petName || !appointmentDate || !email || !petImage) {
//       return res.status(400).json({ message: 'All required fields must be filled.' });
//     }

//     // Ensure the date is a weekday
//     const selectedDate = new Date(appointmentDate);
//     const isWeekday = selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5;
//     if (!isWeekday) {
//       return res.status(400).json({ message: 'Appointments are only available on weekdays (Monday to Friday).' });
//     }

//     const newAppointment = new Appointment({
//       ownerName, petName, service, price, appointmentDate, timeSlot, petImage, email, contactInfo, address
//     });

//     await newAppointment.save();
//     res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
const jwt = require("jsonwebtoken");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.createAppointment = async (req, res) => {
  try {
    // 🔹 Verify JWT token
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    // 🔹 Extract appointment details from request body
    const { ownerName, petName, service, price, appointmentDate, timeSlot, petImage, contactInfo, address } = req.body;
    if (!ownerName || !petName || !appointmentDate || !petImage) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // 🔹 Ensure the appointment is on a weekday
    const selectedDate = new Date(appointmentDate);
    const isWeekday = selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5;
    if (!isWeekday) {
      return res.status(400).json({ message: "Appointments are only available on weekdays (Monday to Friday)." });
    }

    // 🔹 Create a new appointment linked to the logged-in user
    const newAppointment = new Appointment({
      userId: user._id, // Associate with logged-in user
      ownerName,
      petName,
      service,
      price,
      appointmentDate,
      timeSlot,
      petImage,
      email: user.email, // Use email from the authenticated user
      contactInfo,
      address,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
