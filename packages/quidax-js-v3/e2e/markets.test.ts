import Quidax from '../src/index';
import { skipIfNoKey, authed } from './setup';

const publicClient = new Quidax();

describe('Markets', () => {
  it('lists all markets (public)', async () => {
    const res = await publicClient.markets.listAllMarkets();
    expect(res.status).toBe('success');
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0]).toHaveProperty('base_unit');
    expect(res.data[0]).toHaveProperty('quote_unit');
  });

  it('gets all market tickers (public)', async () => {
    const res = await publicClient.markets.getMarketTickers();
    expect(res.status).toBe('success');
    expect(res.data).toHaveProperty('btcngn');
    expect(res.data.btcngn).toHaveProperty('ticker');
    expect(res.data.btcngn.ticker).toHaveProperty('buy');
    expect(res.data.btcngn.ticker).toHaveProperty('sell');
    expect(res.data.btcngn.ticker).toHaveProperty('last');
    expect(res.data.btcngn.ticker).toHaveProperty('vol');
  });

  it('gets a single market ticker (public)', async () => {
    const res = await publicClient.markets.getMarketTicker('btcngn');
    expect(res.status).toBe('success');
    expect(res.data).toHaveProperty('market', 'btcngn');
    expect(res.data.ticker).toHaveProperty('buy');
    expect(res.data.ticker).toHaveProperty('sell');
    expect(res.data.ticker).toHaveProperty('last');
    expect(res.data.ticker).toHaveProperty('vol');
  });

  it('gets market summary (public)', async () => {
    const res = await publicClient.markets.getMarketsSummary();
    expect(res.status).toBe('success');
  });

  it('gets order book', async () => {
    if (skipIfNoKey()) return;
    try {
      const res = await authed!.markets.getOrderBook('btcngn');
      expect(res.data).toHaveProperty('bids');
      expect(res.data).toHaveProperty('asks');
    } catch (e: any) {
      expect(e.statusCode).toBeDefined();
    }
  });

  it('gets K-line data', async () => {
    if (skipIfNoKey()) return;
    try {
      const res = await authed!.markets.getKLine('btcngn', { limit: 5 });
      expect(Array.isArray(res.data)).toBe(true);
    } catch (e: any) {
      expect(e.statusCode).toBeDefined();
    }
  });

  it('gets depth data', async () => {
    if (skipIfNoKey()) return;
    try {
      const res = await authed!.markets.getDepthData('btcngn');
      expect(res.data).toHaveProperty('bids');
      expect(res.data).toHaveProperty('asks');
    } catch (e: any) {
      expect(e.statusCode).toBeDefined();
    }
  });
});
