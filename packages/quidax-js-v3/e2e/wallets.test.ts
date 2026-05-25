import { skipIfNoKey, authed } from './setup';

describe('Wallets', () => {
  it('gets all wallets for the main user', async () => {
    if (skipIfNoKey()) return;
    const wallets = await authed!.wallets.getUserWallets('me');
    expect(Array.isArray(wallets)).toBe(true);
    expect(wallets.length).toBeGreaterThan(0);
    expect(wallets[0]).toHaveProperty('currency');
    expect(wallets[0]).toHaveProperty('balance');
  });

  it('gets a specific wallet', async () => {
    if (skipIfNoKey()) return;
    const wallet = await authed!.wallets.getUserWallet('me', 'btc');
    expect(wallet).toHaveProperty('currency', 'btc');
    expect(wallet).toHaveProperty('balance');
  });
});
