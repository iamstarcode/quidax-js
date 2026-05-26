import { skipIfNoKey, skipIfNoSubAccount, authed, subAccountId } from './setup';

describe('User', () => {
  it('gets all sub-accounts', async () => {
    if (skipIfNoKey()) return;
    const res = await authed!.users.getAllSubAccounts();
    expect(res.status).toBe('success');
    expect(Array.isArray(res.data)).toBe(true);
  });

  it('gets a specific sub-account', async () => {
    if (skipIfNoKey() || skipIfNoSubAccount()) return;
    const res = await authed!.users.getSubAccount(subAccountId!);
    expect(res.data).toHaveProperty('id', subAccountId);
    expect(res.data).toHaveProperty('email');
    expect(res.data).toHaveProperty('first_name');
    expect(res.data).toHaveProperty('last_name');
  });

  it('edits a sub-account and reverts', async () => {
    if (skipIfNoKey() || skipIfNoSubAccount()) return;

    const original = await authed!.users.getSubAccount(subAccountId!);
    const originalFirstName = original.data.first_name;
    const testName = `Test_${Date.now()}`;

    try {
      const updated = await authed!.users.editSubAccount(subAccountId!, {
        first_name: testName,
      });
      expect(updated.data.first_name).toBe(testName);

      const reverted = await authed!.users.editSubAccount(subAccountId!, {
        first_name: originalFirstName,
      });
      expect(reverted.data.first_name).toBe(originalFirstName);
    } catch (e) {
      await authed!.users.editSubAccount(subAccountId!, {
        first_name: originalFirstName,
      });
      throw e;
    }
  });
});
