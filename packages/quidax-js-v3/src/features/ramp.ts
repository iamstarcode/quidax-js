import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
import {
  RampTransaction,
  PaymentMethod,
  PurchaseLimit,
  PurchaseQuote,
} from '../types';

export class Ramp {
  constructor(private client: HttpClient) {}

  getOffRampTransaction(id: string): Promise<ApiResponse<RampTransaction>> {
    return this.client.get<ApiResponse<RampTransaction>>(`/ramp/off/${id}`);
  }

  getOnRampTransaction(id: string): Promise<ApiResponse<RampTransaction>> {
    return this.client.get<ApiResponse<RampTransaction>>(`/ramp/on/${id}`);
  }

  getPaymentMethods(): Promise<ApiResponse<PaymentMethod[]>> {
    return this.client.get<ApiResponse<PaymentMethod[]>>(
      '/ramp/payment_methods'
    );
  }

  getPurchaseLimitsBuy(
    currency?: string
  ): Promise<ApiResponse<PurchaseLimit[]>> {
    return this.client.get<ApiResponse<PurchaseLimit[]>>(
      '/ramp/limits/buy',
      { params: { currency } }
    );
  }

  getPurchaseLimitsSell(
    currency?: string
  ): Promise<ApiResponse<PurchaseLimit[]>> {
    return this.client.get<ApiResponse<PurchaseLimit[]>>(
      '/ramp/limits/sell',
      { params: { currency } }
    );
  }

  getPurchaseQuotesBuy(params: {
    currency: string;
    amount: string;
  }): Promise<ApiResponse<PurchaseQuote>> {
    return this.client.get<ApiResponse<PurchaseQuote>>(
      '/ramp/quotes/buy',
      { params }
    );
  }

  getPurchaseQuotesSell(params: {
    currency: string;
    amount: string;
  }): Promise<ApiResponse<PurchaseQuote>> {
    return this.client.get<ApiResponse<PurchaseQuote>>(
      '/ramp/quotes/sell',
      { params }
    );
  }
}
