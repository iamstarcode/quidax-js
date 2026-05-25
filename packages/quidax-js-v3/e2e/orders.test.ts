import { skipIfNoKey, authed } from './setup';

describe('Orders', () => {
  it('gets all orders for a market', async () => {
    if (skipIfNoKey()) return;
    const orders = await authed!.orders.getAllOrders('me', {
      market: 'btcngn',
      state: 'done',
      order_by: 'desc',
    });
    expect(Array.isArray(orders)).toBe(true);
  });
});
