import { skipIfNoKey, authed } from './setup';

describe('Wallets', () => {
  it('gets all wallets for the main user', async () => {
    if (skipIfNoKey()) return;
    const res = await authed!.wallets.getUserWallets('me');
    expect(res.status).toBe('success');
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0]).toHaveProperty('currency');
    expect(res.data[0]).toHaveProperty('balance');
  });

  it('gets a specific wallet', async () => {
    if (skipIfNoKey()) return;
    const res = await authed!.wallets.getUserWallet('me', 'btc');
    expect(res.data).toHaveProperty('currency', 'btc');
    expect(res.data).toHaveProperty('balance');
  });
});
