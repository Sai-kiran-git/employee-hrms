// const Bull = require("bull");

// const campaignQueue = new Bull("campaign-queue", {
//   redis: {
//     host: "127.0.0.1",
//     port: 6379,
//   },
//   settings: {
//     stalledInterval: 60000,    // check for stalled jobs every 60s
//     maxStalledCount: 3,        // allow 3 stalls before failing
//     lockDuration: 300000,      // 5 minutes lock duration
//     lockRenewTime: 150000,     // renew lock every 2.5 minutes
//   }
// });

// module.exports = { campaignQueue };