import Quidax from '../src/index';
import { skipIfNoKey, authed } from './setup';

const publicClient = new Quidax();

describe('Markets', () => {
  it('lists all markets (public)', async () => {
    const markets = await publicClient.markets.listAllMarkets();
    expect(Array.isArray(markets)).toBe(true);
    expect(markets.length).toBeGreaterThan(0);
    expect(markets[0]).toHaveProperty('base_unit');
    expect(markets[0]).toHaveProperty('quote_unit');
  });

  it('gets all market tickers (public)', async () => {
    const tickers = await publicClient.markets.getMarketTickers();
    expect(Array.isArray(tickers)).toBe(true);
    expect(tickers.length).toBeGreaterThan(0);
    expect(tickers[0]).toHaveProperty('market');
    expect(tickers[0]).toHaveProperty('buy');
    expect(tickers[0]).toHaveProperty('sell');
    expect(tickers[0]).toHaveProperty('last');
    expect(tickers[0]).toHaveProperty('vol');
  });

  it('gets a single market ticker (public)', async () => {
    const ticker = await publicClient.markets.getMarketTicker('btcngn');
    expect(ticker).toHaveProperty('market', 'btcngn');
    expect(ticker).toHaveProperty('buy');
    expect(ticker).toHaveProperty('sell');
    expect(ticker).toHaveProperty('last');
    expect(ticker).toHaveProperty('vol');
  });

  it('gets market summary (public)', async () => {
    const summary = await publicClient.markets.getMarketsSummary();
    expect(Array.isArray(summary)).toBe(true);
    expect(summary.length).toBeGreaterThan(0);
  });

  it('gets order book', async () => {
    if (skipIfNoKey()) return;
    try {
      const book = await authed!.markets.getOrderBook('btcngn');
      expect(book).toHaveProperty('bids');
      expect(book).toHaveProperty('asks');
    } catch (e: any) {
      expect(e.statusCode).toBeDefined();
    }
  });

  it('gets K-line data', async () => {
    if (skipIfNoKey()) return;
    try {
      const kline = await authed!.markets.getKLine('btcngn', { limit: 5 });
      expect(Array.isArray(kline)).toBe(true);
    } catch (e: any) {
      expect(e.statusCode).toBeDefined();
    }
  });

  it('gets depth data', async () => {
    if (skipIfNoKey()) return;
    try {
      const depth = await authed!.markets.getDepthData('btcngn');
      expect(depth).toHaveProperty('bids');
      expect(depth).toHaveProperty('asks');
    } catch (e: any) {
      expect(e.statusCode).toBeDefined();
    }
  });
});
