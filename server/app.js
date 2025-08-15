
const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDatabase = require('./config/connectDatabase');

dotenv.config({ path: "./config/.env" });

// Connect to Database
connectDatabase();

const app = express();

// ✅ Increase request body size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());


// ✅ CORS Configuration
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// ✅ Set headers for every response
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


// ✅ Import Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require('./routes/adminRoutes');
const serviceRoutes = require("./routes/serviceRoutes");
const feedbackRoutes = require('./routes/feedbackRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const formRoutes = require('./routes/formRoutes');
const viewRoutes = require('./routes/viewRoutes');
const homeRoutes = require('./routes/homeRoutes');
const userViewRoutes = require('./routes/userviewRoutes');
const commandRoutes = require("./routes/commandRoutes");

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use("/api/services", serviceRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/userview', userViewRoutes);
app.use("/api/command", commandRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/view', viewRoutes);
app.use('/api/home', homeRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
