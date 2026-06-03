const campaignService = require("../services/campaignService");

exports.createCampaign = async (req, res) => {
  try {
    const campaign = await campaignService.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCampaign = async (req, res) => {
  try {
    const campaign = await campaignService.getCampaign(req.params.id);
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.startCampaign = async (req, res) => {
  try {
    const result = await campaignService.startCampaign(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};