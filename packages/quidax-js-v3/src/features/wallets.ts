import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
import { Wallet, PaymentAddress } from '../types';

export class Wallets {
  constructor(private client: HttpClient) {}

  getUserWallets(userId: string): Promise<ApiResponse<Wallet[]>> {
    return this.client.get<ApiResponse<Wallet[]>>(
      `/users/${userId}/wallets`
    );
  }

  getUserWallet(
    userId: string,
    currency: string
  ): Promise<ApiResponse<Wallet>> {
    return this.client.get<ApiResponse<Wallet>>(
      `/users/${userId}/wallets/${currency.toLowerCase()}`
    );
  }

  getPaymentAddress(
    userId: string,
    currency: string
  ): Promise<ApiResponse<PaymentAddress>> {
    return this.client.get<ApiResponse<PaymentAddress>>(
      `/users/${userId}/wallets/${currency.toLowerCase()}/address`
    );
  }

  getPaymentAddresses(
    userId: string,
    currency: string
  ): Promise<ApiResponse<PaymentAddress[]>> {
    return this.client.get<ApiResponse<PaymentAddress[]>>(
      `/users/${userId}/wallets/${currency.toLowerCase()}/addresses`
    );
  }

  getPaymentAddressById(
    userId: string,
    currency: string,
    addressId: string
  ): Promise<ApiResponse<PaymentAddress>> {
    return this.client.get<ApiResponse<PaymentAddress>>(
      `/users/${userId}/wallets/${currency.toLowerCase()}/addresses/${addressId}`
    );
  }

  createPaymentAddress(
    userId: string,
    currency: string,
    network?: string
  ): Promise<ApiResponse<PaymentAddress>> {
    return this.client.post<ApiResponse<PaymentAddress>>(
      `/users/${userId}/wallets/${currency.toLowerCase()}/addresses`,
      undefined,
      network ? { params: { network } } : undefined
    );
  }
}
