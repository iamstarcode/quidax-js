import { HttpClient } from './client/HttpClient';
import { User } from './features/user';
import { Wallets } from './features/wallets';
import { Markets } from './features/market';
import { Trades } from './features/trades';
import { Swap } from './features/swap';
import { Withdrawals } from './features/withdrawals';
import { Deposit } from './features/deposit';
import { Orders } from './features/orders';
import { Fee } from './features/fee';
import { Ramp } from './features/ramp';
import { Custodial } from './features/custodial';
import { isWebhookSignatureValid } from './utils/webhook';

export { QuidaxError, QuidaxApiError } from './client/errors';
export type { ApiResponse } from './types';

class Quidax {
  users: User;
  wallets: Wallets;
  markets: Markets;
  trades: Trades;
  swaps: Swap;
  withdrawals: Withdrawals;
  deposits: Deposit;
  orders: Orders;
  fees: Fee;
  ramp: Ramp;
  custodial: Custodial;

  constructor(config?: { apiKey?: string; baseUrl?: string }) {
    const client = new HttpClient({
      apiKey: config?.apiKey,
      baseUrl: config?.baseUrl,
    });

    this.users = new User(client);
    this.wallets = new Wallets(client);
    this.markets = new Markets(client);
    this.trades = new Trades(client);
    this.swaps = new Swap(client);
    this.withdrawals = new Withdrawals(client);
    this.deposits = new Deposit(client);
    this.orders = new Orders(client);
    this.fees = new Fee(client);
    this.ramp = new Ramp(client);
    this.custodial = new Custodial(client);
  }
}

export default Quidax;

export const Utils = {
  isWebhookSignatureValid,
};
