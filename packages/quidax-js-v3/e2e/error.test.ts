import { QuidaxApiError } from '../src/client/errors';
import Quidax from '../src/index';

describe('Error handling', () => {
  it('public client methods work without API key', async () => {
    const client = new Quidax();
    const res = await client.markets.getMarketTickers();
    expect(res.status).toBe('success');
    expect(res.data).toHaveProperty('btcngn');
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
