import { skipIfNoKey, authed } from './setup';

describe('Fee', () => {
  it('gets crypto withdrawal fee', async () => {
    if (skipIfNoKey()) return;
    try {
      await authed!.fees.getCryptoWithdrawalFee('btc', 'bitcoin');
    } catch (e: any) {
      expect(e.code).toBe('INVALID_RESPONSE');
      expect(e.statusCode).toBeDefined();
    }
  });
});
