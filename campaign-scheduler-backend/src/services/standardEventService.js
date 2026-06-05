const fs = require("fs");
const path = require("path");
const { pushToQueue } = require("../queues/standardEventQueue");
const FLAT_FILE_PATH = path.join(process.cwd(), "data", "standard_events.ndjson");

// Ensure data folder exists
if (!fs.existsSync(path.dirname(FLAT_FILE_PATH))) {
  fs.mkdirSync(path.dirname(FLAT_FILE_PATH), { recursive: true });
}

/**
 * Step 1 — Write event to flat file (NDJSON — one event per line)
 * Step 2 — Push event to Redis via queue
 */
const saveStandardEvent = async (event) => {
  // Write to flat file
  const line = JSON.stringify(event) + "\n";
  fs.appendFileSync(FLAT_FILE_PATH, line, "utf8");

  // Push to Redis queue
  await pushToQueue(event);
};

module.exports = { saveStandardEvent };