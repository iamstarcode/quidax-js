import { HttpClient } from '../client/HttpClient';
import {
  Withdrawal,
  CreateWithdrawalRequest,
  CreateBankWithdrawalRequest,
} from '../types';

export class Withdrawals {
  constructor(private client: HttpClient) {}

  getAllWithdrawals(
    userId: string,
    params?: {
      currency?: string;
      state?: string;
      order_by?: 'asc' | 'desc';
    }
  ): Promise<Withdrawal[]> {
    return this.client.get<Withdrawal[]>(
      `/users/${userId}/withdraws`,
      { params: params as Record<string, string | undefined> }
    );
  }

  createWithdrawal(
    userId: string,
    data: CreateWithdrawalRequest
  ): Promise<Withdrawal> {
    return this.client.post<Withdrawal>(
      `/users/${userId}/withdraws`,
      data
    );
  }

  createBankWithdrawal(
    userId: string,
    data: CreateBankWithdrawalRequest
  ): Promise<Withdrawal> {
    return this.client.post<Withdrawal>(
      `/users/${userId}/withdraws`,
      data
    );
  }

  getWithdrawalDetail(
    userId: string,
    withdrawalId: string
  ): Promise<Withdrawal> {
    return this.client.get<Withdrawal>(
      `/users/${userId}/withdraws/${withdrawalId}`
    );
  }

  cancelWithdrawal(
    userId: string,
    withdrawalId: string
  ): Promise<Withdrawal> {
    return this.client.post<Withdrawal>(
      `/users/${userId}/withdraws/${withdrawalId}/cancel`,
      {}
    );
  }

  getWithdrawalByReference(
    userId: string,
    reference: string
  ): Promise<Withdrawal> {
    return this.client.get<Withdrawal>(
      `/users/${userId}/withdraws/reference/${reference}`
    );
  }
}
