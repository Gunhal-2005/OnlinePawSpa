const express = require('express');
const { createAppointment } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/', createAppointment); // POST request to save appointment

module.exports = router;


