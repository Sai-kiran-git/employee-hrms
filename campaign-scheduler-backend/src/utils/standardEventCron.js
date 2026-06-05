const cron = require("node-cron");
const StandardEvent = require("../models/StandardEvents");
const { drainQueue } = require("../queues/standardEventQueue");

let isRunning = false;

const startStandardEventsCron = () => {
  cron.schedule(
    "*/5 * * * *",
    async () => {
      if (isRunning) return;
      isRunning = true;

      const batchId = `batch_${Date.now()}`;
      console.log(`[StandardEventsCron] ⏰ Running — batchId: ${batchId}`);

      try {
        // Drain all events from Redis
        const events = await drainQueue();

        if (events.length === 0) {
          console.log("[StandardEventsCron] Queue is empty, skipping.");
          return;
        }

        // Tag with batchId and insert into MongoDB
        const tagged = events.map((e) => ({
          ...e,
          batchId,
          rawPayload: e,
          processedAt: new Date(),
          processedAtText: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
        }));

        const result = await StandardEvent.insertMany(tagged, { ordered: false });
        console.log(`[StandardEventsCron] ✅ Inserted ${result.length} events into MongoDB`);

      } catch (error) {
        if (error.name === "BulkWriteError") {
          console.warn(`[StandardEventsCron] ⚠️ Partial insert: ${error.result?.nInserted || 0} inserted`);
        } else {
          console.error("[StandardEventsCron] ❌ Error:", error.message);
        }
      } finally {
        isRunning = false;
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );

  console.log("[StandardEventsCron] 🚀 Started — runs every 5 minutes");
};

module.exports = { startStandardEventsCron };