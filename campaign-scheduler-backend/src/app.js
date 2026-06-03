const express = require('express');
const cors = require('cors');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();

app.use(cors()); // ✅ add this
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Campaign Scheduler API Running' });
});

app.use('/api/campaigns', campaignRoutes);

module.exports = app;