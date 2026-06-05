const express = require("express");
const router = express.Router();
const { trackStandardEvent } = require("../controllers/standardEventController");

router.post("/", trackStandardEvent);

module.exports = router;