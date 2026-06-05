// const Campaign = require("../models/Campaign");
// const Recipient = require("../models/Recipient");
// const { campaignQueue } = require("../queues/campaignQueue");
// const fakeRecipients = require("../utils/fakeRecipients");

// const createCampaign = async (data) => {
//   const campaign = await Campaign.create(data);
//   return campaign;
// };

// const getCampaign = async (id) => {
//   const campaign = await Campaign.findById(id);
//   return campaign;
// };

// const startCampaign = async (campaignId) => {
//   const campaign = await Campaign.findById(campaignId);
//   if (!campaign) throw new Error("Campaign not found");

//   campaign.status = "running";
//   campaign.startTime = new Date();
//   campaign.total = fakeRecipients.length;
//   await campaign.save();

//   await campaignQueue.add(
//     {
//       campaignId: campaign._id,
//       recipients: fakeRecipients,
//       subject: campaign.subject,
//       body: campaign.body,
//       startTime: Date.now(),
//     },
//     { attempts: 3 }
//   );

//   return { message: "Campaign started", campaignId };
// };

// module.exports = { createCampaign, getCampaign, startCampaign };