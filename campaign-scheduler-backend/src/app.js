const express = require("express");
const app = express();

app.use(express.json());

const standardEventRoutes = require("./routes/standardEventRoute");

app.use("/api/events", standardEventRoutes);

module.exports = app;