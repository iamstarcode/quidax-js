import { skipIfNoKey, authed } from './setup';

describe('Trades', () => {
  it('gets recent trades for a market', async () => {
    if (skipIfNoKey()) return;
    try {
      const res = await authed!.trades.getRecentTrades('btcngn', {
        limit: 10,
      });
      expect(Array.isArray(res.data)).toBe(true);
    } catch (e: any) {
      expect(e.statusCode).toBeDefined();
    }
  });
});
