import { skipIfNoKey, authed } from './setup';

describe('Swap', () => {
  it('creates a swap quotation (no confirm)', async () => {
    if (skipIfNoKey()) return;
    const res = await authed!.swaps.createSwap('me', {
      from_currency: 'btc',
      to_currency: 'usdt',
      from_amount: '0.001',
    });
    expect(res.status).toBe('success');
    expect(res.data).toHaveProperty('id');
    expect(res.data).toHaveProperty('from_currency');
    expect(res.data).toHaveProperty('to_currency');
    expect(res.data).toHaveProperty('from_amount', '0.001');
    expect(res.data).toHaveProperty('expires_at');
  });
});
