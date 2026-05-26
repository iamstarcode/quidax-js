import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
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
  ): Promise<ApiResponse<CustodialTransaction>> {
    return this.client.post<ApiResponse<CustodialTransaction>>(
      '/custodial/on-ramp',
      data
    );
  }

  refreshOnRampTransaction(
    id: string,
    data?: Partial<InitiateOnRampRequest>
  ): Promise<ApiResponse<CustodialTransaction>> {
    return this.client.put<ApiResponse<CustodialTransaction>>(
      `/custodial/on-ramp/${id}`,
      data
    );
  }

  confirmOnRampTransaction(
    id: string
  ): Promise<ApiResponse<CustodialTransaction>> {
    return this.client.post<ApiResponse<CustodialTransaction>>(
      `/custodial/on-ramp/${id}/confirm`,
      {}
    );
  }

  initiateOffRampTransaction(
    data: InitiateOffRampRequest
  ): Promise<ApiResponse<CustodialTransaction>> {
    return this.client.post<ApiResponse<CustodialTransaction>>(
      '/custodial/off-ramp',
      data
    );
  }

  confirmOffRampTransaction(
    id: string
  ): Promise<ApiResponse<CustodialTransaction>> {
    return this.client.post<ApiResponse<CustodialTransaction>>(
      `/custodial/off-ramp/${id}/confirm`,
      {}
    );
  }

  getBanksOffRamp(): Promise<ApiResponse<BankAccount[]>> {
    return this.client.get<ApiResponse<BankAccount[]>>(
      '/custodial/off-ramp/banks'
    );
  }

  addBankAccountOffRamp(
    data: Omit<BankAccount, 'id'>
  ): Promise<ApiResponse<BankAccount>> {
    return this.client.post<ApiResponse<BankAccount>>(
      '/custodial/off-ramp/banks',
      data
    );
  }

  refreshOffRampTransaction(
    id: string,
    data?: Partial<InitiateOnRampRequest>
  ): Promise<ApiResponse<CustodialTransaction>> {
    return this.client.put<ApiResponse<CustodialTransaction>>(
      `/custodial/off-ramp/${id}`,
      data
    );
  }
}
