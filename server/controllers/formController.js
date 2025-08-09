// const Form = require('../models/form');

// // Get all forms
// const getForms = async (req, res) => {
//   try {
//     const forms = await Form.find();
//     res.status(200).json(forms);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Add a new form
// const addForm = async (req, res) => {
//   const { name, description, price } = req.body;

//   try {
//     const newForm = new Form({ name, description, price });
//     await newForm.save();
//     res.status(201).json(newForm);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update an existing form
// const updateForm = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price } = req.body;

//   try {
//     const updatedForm = await Form.findByIdAndUpdate(id, { name, description, price }, { new: true });
//     res.status(200).json(updatedForm);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a form
// const deleteForm = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Form.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Form deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = { getForms, addForm, updateForm, deleteForm };

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
