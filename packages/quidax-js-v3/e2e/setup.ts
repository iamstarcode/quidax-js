import Quidax from '../src/index';

const API_KEY = process.env.QUIDAX_API_KEY;
const BASE_URL = process.env.QUIDAX_BASE_URL;

let authed: Quidax | null = null;
let subAccountId: string | undefined;

if (API_KEY) {
  authed = new Quidax({
    apiKey: API_KEY,
    ...(BASE_URL ? { baseUrl: BASE_URL } : {}),
  });
  subAccountId = process.env.SUB_ACCOUNT_ID;
}

export { authed, subAccountId };

export function skipIfNoKey(): boolean {
  if (!API_KEY) {
    console.warn('SKIP: set QUIDAX_API_KEY to run this test');
    return true;
  }
  return false;
}

export function skipIfNoSubAccount(): boolean {
  if (!subAccountId) {
    console.warn('SKIP: set SUB_ACCOUNT_ID to run this test');
    return true;
  }
  return false;
}
