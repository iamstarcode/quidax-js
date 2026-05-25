import { HttpClient } from '../client/HttpClient';
import {
  RampTransaction,
  PaymentMethod,
  PurchaseLimit,
  PurchaseQuote,
} from '../types';

export class Ramp {
  constructor(private client: HttpClient) {}

  getOffRampTransaction(id: string): Promise<RampTransaction> {
    return this.client.get<RampTransaction>(`/ramp/off/${id}`);
  }

  getOnRampTransaction(id: string): Promise<RampTransaction> {
    return this.client.get<RampTransaction>(`/ramp/on/${id}`);
  }

  getPaymentMethods(): Promise<PaymentMethod[]> {
    return this.client.get<PaymentMethod[]>('/ramp/payment_methods');
  }

  getPurchaseLimitsBuy(
    currency?: string
  ): Promise<PurchaseLimit[]> {
    return this.client.get<PurchaseLimit[]>('/ramp/limits/buy', {
      params: { currency },
    });
  }

  getPurchaseLimitsSell(
    currency?: string
  ): Promise<PurchaseLimit[]> {
    return this.client.get<PurchaseLimit[]>('/ramp/limits/sell', {
      params: { currency },
    });
  }

  getPurchaseQuotesBuy(params: {
    currency: string;
    amount: string;
  }): Promise<PurchaseQuote> {
    return this.client.get<PurchaseQuote>('/ramp/quotes/buy', {
      params,
    });
  }

  getPurchaseQuotesSell(params: {
    currency: string;
    amount: string;
  }): Promise<PurchaseQuote> {
    return this.client.get<PurchaseQuote>('/ramp/quotes/sell', {
      params,
    });
  }
}
