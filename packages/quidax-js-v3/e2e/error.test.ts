import { QuidaxApiError } from '../src/client/errors';
import Quidax from '../src/index';

describe('Error handling', () => {
  it('public client methods work without API key', async () => {
    const client = new Quidax();
    const tickers = await client.markets.getMarketTickers();
    expect(Array.isArray(tickers)).toBe(true);
    expect(tickers.length).toBeGreaterThan(0);
  });

  it('throws when calling authenticated method without API key', async () => {
    const client = new Quidax();
    await expect(client.users.getAllSubAccounts()).rejects.toThrow(
      'API key is required'
    );
  });

  it('throws 401 with invalid API key', async () => {
    const bad = new Quidax({ apiKey: 'invalid_key_12345' });
    await expect(bad.users.getAllSubAccounts()).rejects.toThrow(QuidaxApiError);
  });
});
