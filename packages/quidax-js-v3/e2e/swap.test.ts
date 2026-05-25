import { skipIfNoKey, authed } from './setup';

describe('Swap', () => {
  it('creates a swap quotation (no confirm)', async () => {
    if (skipIfNoKey()) return;
    const quotation = await authed!.swaps.createSwap('me', {
      from_currency: 'btc',
      to_currency: 'usdt',
      from_amount: '0.001',
    });
    expect(quotation).toHaveProperty('id');
    expect(quotation).toHaveProperty('from_currency');
    expect(quotation).toHaveProperty('to_currency');
    expect(quotation).toHaveProperty('from_amount', '0.001');
    expect(quotation).toHaveProperty('quoted_price');
    expect(quotation).toHaveProperty('expires_at');
  });
});
