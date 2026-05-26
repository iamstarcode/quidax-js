import { skipIfNoKey, authed } from './setup';

describe('Orders', () => {
  it('gets all orders for a market', async () => {
    if (skipIfNoKey()) return;
    const res = await authed!.orders.getAllOrders('me', {
      market: 'btcngn',
      state: 'done',
      order_by: 'desc',
    });
    expect(res.status).toBe('success');
    expect(Array.isArray(res.data)).toBe(true);
  });
});
