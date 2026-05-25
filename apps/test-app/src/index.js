const express = require('express');
const Quidax = require('@iamstarcode/quidax-js-v3').default;

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.QUIDAX_API_KEY;
const BASE_URL = process.env.QUIDAX_BASE_URL;

const client = new Quidax(
  API_KEY ? { apiKey: API_KEY, ...(BASE_URL ? { baseUrl: BASE_URL } : {}) } : undefined
);

app.get('/', (req, res) => {
  res.json({
    name: 'quidax-js test app',
    version: require('../package.json').version,
    hasApiKey: !!API_KEY,
    baseUrl: BASE_URL || 'default (v3)',
  });
});

app.get('/markets/tickers', async (req, res) => {
  try {
    const tickers = await client.markets.getMarketTickers();
    res.json({ count: tickers.length, sample: tickers.slice(0, 2) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/markets/tickers/:market', async (req, res) => {
  try {
    const ticker = await client.markets.getMarketTicker(req.params.market);
    res.json(ticker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/wallets', async (req, res) => {
  if (!API_KEY) return res.status(401).json({ error: 'Set QUIDAX_API_KEY' });
  try {
    const wallets = await client.wallets.getUserWallets('me');
    res.json({ count: wallets.length, wallets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/users', async (req, res) => {
  if (!API_KEY) return res.status(401).json({ error: 'Set QUIDAX_API_KEY' });
  try {
    const users = await client.users.getAllSubAccounts();
    res.json({ count: users.length, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`test-app running on http://localhost:${PORT}`);
  console.log(`API key set: ${!!API_KEY}`);
  console.log(`Base URL: ${BASE_URL || 'default (v3)'}`);
});
