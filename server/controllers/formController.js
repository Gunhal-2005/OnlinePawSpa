

const Form = require("../models/Form");

// @desc Get all forms
// @route GET /api/forms
const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Add a new form
// @route POST /api/forms
const addForm = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || isNaN(price) || price <= 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const newForm = new Form({ name, description, price });
    await newForm.save();

    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update a form
// @route PUT /api/forms/:id
const updateForm = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Delete a form
// @route DELETE /api/forms/:id
const deleteForm = async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getForms, addForm, updateForm, deleteForm };
