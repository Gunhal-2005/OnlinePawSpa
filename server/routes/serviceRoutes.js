const express = require("express");
const { getServices } = require("../controllers/serviceController");

const router = express.Router();

router.get("/", getServices); // ✅ This maps to "/api/services"

module.exports = router;

