

const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
