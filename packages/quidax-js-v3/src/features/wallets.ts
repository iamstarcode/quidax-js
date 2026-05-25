import { HttpClient } from '../client/HttpClient';
import { Wallet, PaymentAddress } from '../types';

export class Wallets {
  constructor(private client: HttpClient) {}

  getUserWallets(userId: string): Promise<Wallet[]> {
    return this.client.get<Wallet[]>(`/users/${userId}/wallets`);
  }

  getUserWallet(userId: string, currency: string): Promise<Wallet> {
    return this.client.get<Wallet>(
      `/users/${userId}/wallets/${currency.toLowerCase()}`
    );
  }

  getPaymentAddress(
    userId: string,
    currency: string
  ): Promise<PaymentAddress> {
    return this.client.get<PaymentAddress>(
      `/users/${userId}/wallets/${currency.toLowerCase()}/address`
    );
  }

  getPaymentAddresses(
    userId: string,
    currency: string
  ): Promise<PaymentAddress[]> {
    return this.client.get<PaymentAddress[]>(
      `/users/${userId}/wallets/${currency.toLowerCase()}/addresses`
    );
  }

  getPaymentAddressById(
    userId: string,
    currency: string,
    addressId: string
  ): Promise<PaymentAddress> {
    return this.client.get<PaymentAddress>(
      `/users/${userId}/wallets/${currency.toLowerCase()}/addresses/${addressId}`
    );
  }

  createPaymentAddress(
    userId: string,
    currency: string,
    network?: string
  ): Promise<PaymentAddress> {
    return this.client.post<PaymentAddress>(
      `/users/${userId}/wallets/${currency.toLowerCase()}/addresses`,
      undefined,
      network ? { params: { network } } : undefined
    );
  }
}
