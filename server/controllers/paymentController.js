// // controllers/paymentController.js

// // Sample processPayment function
// const processPayment = async (req, res) => {
//     try {
//       // Your payment processing logic here
//       // For example, you might interact with a payment API like Stripe or PayPal
  
//       // Simulating a successful payment response
//       res.status(200).json({ message: 'Payment processed successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error processing payment', error: error.message });
//     }
//   };
  
//   module.exports = { processPayment };
  
// const Appointment = require('../models/Appointment');
// const Payment = require('../models/Payment');
// const crypto = require('crypto');

// exports.processPayment = async (req, res) => {
//   try {
//     const { appointmentId, amount } = req.body;
//     const userId = req.user.id; // Extracted from JWT authentication

//     // Simulated payment processing
//     const transactionId = crypto.randomBytes(16).toString('hex'); // Fake transaction ID

//     const newPayment = new Payment({
//       userId,
//       appointmentId,
//       amount,
//       status: 'Success',
//       transactionId,
//     });

//     await newPayment.save();

//     // Update appointment status to "Booked"
//     await Appointment.findByIdAndUpdate(appointmentId, { status: 'Booked' });

//     res.status(200).json({ success: true, message: 'Payment successful', transactionId });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

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
