

const Payment = require('../models/Payment');
const Appointment = require('../models/Appointment');

// Process payment
exports.processPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    
    const payment = new Payment({ appointmentId, status: 'Success' });
    await payment.save();
    await Appointment.findByIdAndUpdate(appointmentId, { status: 'Booked' });
    
    res.json({ success: true, message: 'Payment successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment failed' });
  }
};
