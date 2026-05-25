# quidax-js

Unofficial Node.js client for the Quidax API (v3).

| Package | API Version | npm Tag | Install |
|---------|-------------|---------|---------|
| `packages/quidax-js-v1` | v1 | `latest` (0.1.x) | `npm i @iamstarcode/quidax-js` |
| `packages/quidax-js-v3` | v3 | `v3` (3.0.x) | `npm i @iamstarcode/quidax-js@v3` |

## Requirements

Node.js 18+ (native `fetch`).

## Quickstart

```typescript
import Quidax from '@iamstarcode/quidax-js';

// Public endpoints only — no API key needed
const client = new Quidax();
const tickers = await client.markets.getMarketTickers();

// Authenticated endpoints — pass your API key
const authed = new Quidax({ apiKey: 'your_key' });
const wallets = await authed.wallets.getUserWallets('me');
```

### Using with the v1 base URL

```typescript
const client = new Quidax({
  apiKey: 'your_key',
  baseUrl: 'https://app.quidax.io/api/v1',
});
```

## API Reference

### Users

```typescript
await client.users.createSubaccount({ email, first_name, last_name });
await client.users.getParentAccount();
await client.users.getSubAccount(userId);
await client.users.getAllSubAccounts();
await client.users.editSubAccount(userId, { first_name, last_name });
```

### Wallets

```typescript
await client.wallets.getUserWallets(userId);
await client.wallets.getUserWallet(userId, currency);
await client.wallets.getPaymentAddress(userId, currency);
await client.wallets.getPaymentAddresses(userId, currency);
await client.wallets.getPaymentAddressById(userId, currency, addressId);
await client.wallets.createPaymentAddress(userId, currency, network?);
```

### Markets

```typescript
// Public — no API key needed
await client.markets.listAllMarkets();
await client.markets.getMarketTickers();
await client.markets.getMarketTicker('btcngn');
await client.markets.getMarketsSummary();

// Authenticated
await client.markets.getKLine('btcngn', { limit: 5 });
await client.markets.getKLinePending('btcngn');
await client.markets.getOrderBook('btcngn');
await client.markets.getDepthData('btcngn');
```

### Trades

```typescript
await client.trades.getMarketTrades('btcngn');
await client.trades.getRecentTrades('btcngn', { limit: 10 });
```

### Swap

```typescript
await client.swaps.createSwap('me', {
  from_currency: 'btc', to_currency: 'usdt', from_amount: '0.001'
});
await client.swaps.confirmSwap('me', quotationId);
await client.swaps.refreshSwap('me', quotationId, { from_currency, to_currency, from_amount });
await client.swaps.temporarySwapQuotation('me', { from_currency, to_currency, from_amount });
await client.swaps.getSwapTransaction('me', transactionId);
await client.swaps.getSwapTransactions('me');
```

### Withdrawals

```typescript
await client.withdrawals.getAllWithdrawals('me', { currency: 'btc', state: 'done' });
await client.withdrawals.createWithdrawal('me', {
  currency: 'btc', amount: '0.01', fund_uid: 'address'
});
await client.withdrawals.createBankWithdrawal('me', {
  currency: 'ngn', amount: '1000', fund_uid: 'account_no', reference: '...'
});
await client.withdrawals.getWithdrawalDetail('me', withdrawalId);
await client.withdrawals.cancelWithdrawal('me', withdrawalId);
await client.withdrawals.getWithdrawalByReference('me', reference);
```

### Deposits

```typescript
await client.deposits.getAllDeposits('me', { currency: 'btc', state: 'accepted' });
await client.deposits.getDeposit('me', depositId);
await client.deposits.getDepositsBySubUser('me');
```

### Orders

```typescript
await client.orders.createOrder('me', {
  market: 'btcngn', side: 'buy', volume: '0.001'
});
await client.orders.getAllOrders('me', { market: 'btcngn', state: 'done' });
await client.orders.getOrderDetail('me', orderId);
await client.orders.cancelOrder('me', orderId);
```

### Fees

```typescript
await client.fees.getCryptoWithdrawalFee('btc', 'bitcoin');
```

### RAMP

```typescript
await client.ramp.getOffRampTransaction(id);
await client.ramp.getOnRampTransaction(id);
await client.ramp.getPaymentMethods();
await client.ramp.getPurchaseLimitsBuy('ngn');
await client.ramp.getPurchaseLimitsSell('ngn');
await client.ramp.getPurchaseQuotesBuy({ currency: 'btc', amount: '0.01' });
await client.ramp.getPurchaseQuotesSell({ currency: 'btc', amount: '0.01' });
```

### Custodial

```typescript
await client.custodial.initiateOnRampTransaction({
  currency: 'ngn', amount: '1000', payment_method: 'bank', reference: '...'
});
await client.custodial.refreshOnRampTransaction(id);
await client.custodial.confirmOnRampTransaction(id);
await client.custodial.initiateOffRampTransaction({
  currency: 'btc', amount: '0.01', fund_uid: 'address', reference: '...'
});
await client.custodial.confirmOffRampTransaction(id);
await client.custodial.getBanksOffRamp();
await client.custodial.addBankAccountOffRamp(data);
await client.custodial.refreshOffRampTransaction(id);
```

## Error Handling

```typescript
import Quidax, { QuidaxError, QuidaxApiError } from '@iamstarcode/quidax-js';

try {
  await client.users.getAllSubAccounts();
} catch (error) {
  if (error instanceof QuidaxApiError) {
    console.error(error.statusCode, error.message);
  }
}
```

## Webhooks

```typescript
import { Utils } from '@iamstarcode/quidax-js';

const isValid = Utils.isWebhookSignatureValid(req, 'your_signature_secret');
```

## Migrating from v1

| v1 | v3 |
|----|-----|
| `new Quidax(apiKey)` | `new Quidax({ apiKey })` |
| `axios` HTTP | Native `fetch` (Node 18+) |
| `handleError()` returns object | Throws `QuidaxApiError` |
| Unstructured responses | Full TypeScript types |
| `apiKey` required | `apiKey` optional |
