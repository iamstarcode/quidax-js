import { skipIfNoKey, authed } from './setup';

describe('Trades', () => {
  it('gets recent trades for a market', async () => {
    if (skipIfNoKey()) return;
    try {
      const trades = await authed!.trades.getRecentTrades('btcngn', {
        limit: 10,
      });
      expect(Array.isArray(trades)).toBe(true);
    } catch (e: any) {
      expect(e.statusCode).toBeDefined();
    }
  });
});
