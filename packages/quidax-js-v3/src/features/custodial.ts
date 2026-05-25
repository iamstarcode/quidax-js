import { HttpClient } from '../client/HttpClient';
import {
  CustodialTransaction,
  BankAccount,
  InitiateOnRampRequest,
  InitiateOffRampRequest,
} from '../types';

export class Custodial {
  constructor(private client: HttpClient) {}

  initiateOnRampTransaction(
    data: InitiateOnRampRequest
  ): Promise<CustodialTransaction> {
    return this.client.post<CustodialTransaction>(
      '/custodial/on-ramp',
      data
    );
  }

  refreshOnRampTransaction(
    id: string,
    data?: Partial<InitiateOnRampRequest>
  ): Promise<CustodialTransaction> {
    return this.client.put<CustodialTransaction>(
      `/custodial/on-ramp/${id}`,
      data
    );
  }

  confirmOnRampTransaction(
    id: string
  ): Promise<CustodialTransaction> {
    return this.client.post<CustodialTransaction>(
      `/custodial/on-ramp/${id}/confirm`,
      {}
    );
  }

  initiateOffRampTransaction(
    data: InitiateOffRampRequest
  ): Promise<CustodialTransaction> {
    return this.client.post<CustodialTransaction>(
      '/custodial/off-ramp',
      data
    );
  }

  confirmOffRampTransaction(
    id: string
  ): Promise<CustodialTransaction> {
    return this.client.post<CustodialTransaction>(
      `/custodial/off-ramp/${id}/confirm`,
      {}
    );
  }

  getBanksOffRamp(): Promise<BankAccount[]> {
    return this.client.get<BankAccount[]>(
      '/custodial/off-ramp/banks'
    );
  }

  addBankAccountOffRamp(
    data: Omit<BankAccount, 'id'>
  ): Promise<BankAccount> {
    return this.client.post<BankAccount>(
      '/custodial/off-ramp/banks',
      data
    );
  }

  refreshOffRampTransaction(
    id: string,
    data?: Partial<InitiateOffRampRequest>
  ): Promise<CustodialTransaction> {
    return this.client.put<CustodialTransaction>(
      `/custodial/off-ramp/${id}`,
      data
    );
  }
}
