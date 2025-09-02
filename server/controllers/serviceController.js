

const Service = require("../models/Form"); // ✅ Ensure this is the correct path

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().lean(); // Ensure plain objects (avoid Mongoose issues)

    console.log("Services from DB:", services); // Debugging log

    // Remove duplicates using Map (by unique _id)
    const uniqueServices = [...new Map(services.map(s => [s._id.toString(), s])).values()];

    console.log("Unique services:", uniqueServices); // Debugging log
    res.json(uniqueServices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};
