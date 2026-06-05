// const { campaignQueue } = require("../queues/campaignQueue");
// const { createTransporter } = require("../utils/mailer");
// const Campaign = require("../models/Campaign");

// let transporter = null;

// campaignQueue.process(async (job) => {
//   console.log("🔄 Worker picked up job:", job.id);

//   const { recipients, campaignId, startTime } = job.data;

//   try {
//     if (!transporter) {
//       transporter = await createTransporter();
//       console.log("📧 Transporter created");
//     }

//     let sent = 0;
//     let failed = 0;

//     for (const user of recipients) {
//       try {
//         await transporter.sendMail({
//           from: "test@campaign.com",
//           to: user.email,
//           subject: "Campaign Email",
//           text: `Hello ${user.name}`
//         });
//         sent++;
//         if (sent % 10 === 0) console.log(`📨 Sent ${sent} emails...`);
//       } catch (err) {
//         console.log(`❌ Failed to send to ${user.email}:`, err.message);
//         failed++;
//       }
//     }

//     const timeTaken = Date.now() - startTime;

//     await Campaign.findByIdAndUpdate(campaignId, {
//       sent,
//       failed,
//       timeTaken,
//       status: "completed",
//       endTime: new Date(),
//     });

//     console.log(`✅ Campaign ${campaignId} done — sent: ${sent}, failed: ${failed}, time: ${timeTaken}ms`);

//     return { campaignId, sent, failed, total: recipients.length, timeTaken };

//   } catch (err) {
//     console.error("🔴 Worker error:", err.message);
//     throw err;
//   }
// });

// campaignQueue.on("failed", (job, err) => {
//   console.error("🔴 Job failed:", job.id, err.message);
// });

// campaignQueue.on("completed", (job, result) => {
//   console.log("✅ Job completed:", job.id);
// });