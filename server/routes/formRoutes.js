// const express = require('express');
// const {
//   getForms,
//   addForm,
//   updateForm,
//   deleteForm,
// } = require('../controllers/formController');

// const router = express.Router();

// // Get all forms
// router.get('/', getForms);

// // Add a new form
// router.post('/', addForm);

// // Update an existing form
// router.put('/:id', updateForm);

// // Delete a form
// router.delete('/:id', deleteForm);

// module.exports = router;

const express = require("express");
const { getForms, addForm, updateForm, deleteForm } = require("../controllers/formController");

const router = express.Router();

router.get("/", getForms);
router.post("/", addForm);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);

module.exports = router;
