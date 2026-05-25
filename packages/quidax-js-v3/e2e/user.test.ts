import { skipIfNoKey, skipIfNoSubAccount, authed, subAccountId } from './setup';

describe('User', () => {
  it('gets all sub-accounts', async () => {
    if (skipIfNoKey()) return;
    const users = await authed!.users.getAllSubAccounts();
    expect(Array.isArray(users)).toBe(true);
  });

  it('gets a specific sub-account', async () => {
    if (skipIfNoKey() || skipIfNoSubAccount()) return;
    const user = await authed!.users.getSubAccount(subAccountId!);
    expect(user).toHaveProperty('id', subAccountId);
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
  });

  it('edits a sub-account and reverts', async () => {
    if (skipIfNoKey() || skipIfNoSubAccount()) return;

    const original = await authed!.users.getSubAccount(subAccountId!);
    const originalFirstName = original.first_name;
    const testName = `Test_${Date.now()}`;

    try {
      const updated = await authed!.users.editSubAccount(subAccountId!, {
        first_name: testName,
      });
      expect(updated.first_name).toBe(testName);

      const reverted = await authed!.users.editSubAccount(subAccountId!, {
        first_name: originalFirstName,
      });
      expect(reverted.first_name).toBe(originalFirstName);
    } catch (e) {
      await authed!.users.editSubAccount(subAccountId!, {
        first_name: originalFirstName,
      });
      throw e;
    }
  });
});
