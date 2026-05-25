import User from './features/user';
import Wallets from './features/wallets';
import Markets from './features/market';
import Withdrawals from './features/withdrawals';
import Swap from './features/swap';
import Fee from './features/fee';
import Deposit from './features/deposit';
import { isWebhookSignatureValid } from './utils';

class Quidax {
  apiKey: string;

  users: User;

  wallets: Wallets;

  markets: Markets;

  withdrawals: Withdrawals;

  swaps: Swap;

  fees: Fee;

  deposits: Deposit;

  /*  
  orders: Orders;
   */

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.users = new User(this.apiKey);
    this.wallets = new Wallets(this.apiKey);
    this.markets = new Markets(this.apiKey);
    this.withdrawals = new Withdrawals(this.apiKey);
    this.swaps = new Swap(this.apiKey);
    this.fees = new Fee(this.apiKey);
    this.deposits = new Deposit(this.apiKey);

    /*
    this.orders = new Orders(this.api_key);
   */
  }
}
export default Quidax;
export const Utils = {
  isWebhookSignatureValid,
};
