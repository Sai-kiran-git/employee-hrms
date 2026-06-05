require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

// ✅ IMPORT CRON PROPERLY
const { startStandardEventsCron } = require("./src/utils/standardEventCron");

// connect DB
connectDB();

// start cron
startStandardEventsCron();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// require('dotenv').config();

// const app = require('./src/app');
// const connectDB = require('./src/config/db');
// const Campaign = require('./src/models/Campaign');
// require('./src/workers/emailWorker');

// connectDB().then(async () => {
//   const dummy = await Campaign.create({
//     name: "Summer Sale Campaign",
//     subject: "Exclusive deals just for you!",
//     body: "Hello! Check out our amazing summer deals.",
//     status: "pending",
//     total: 100,
//     sent: 0,
//     failed: 0,
//   });

//   console.log("✅ Dummy Campaign Created:", dummy);
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });