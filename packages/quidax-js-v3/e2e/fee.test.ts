import { skipIfNoKey, authed } from './setup';

describe('Fee', () => {
  it('gets crypto withdrawal fee', async () => {
    if (skipIfNoKey()) return;
    const { status, data } =
      await authed!.fees.getCryptoWithdrawalFee('btc', 'bitcoin');
    expect(status).toBe('success');
    expect(data).toBeDefined();
    expect(['flat', 'range']).toContain(data.type);
    if (data.type === 'flat') {
      expect(typeof data.fee).toBe('number');
    } else {
      expect(Array.isArray(data.fee)).toBe(true);
      expect(data.fee.length).toBeGreaterThan(0);
    }
  });
});
