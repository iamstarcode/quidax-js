import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
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
  ): Promise<ApiResponse<Withdrawal[]>> {
    return this.client.get<ApiResponse<Withdrawal[]>>(
      `/users/${userId}/withdraws`,
      { params: params as Record<string, string | undefined> }
    );
  }

  createWithdrawal(
    userId: string,
    data: CreateWithdrawalRequest
  ): Promise<ApiResponse<Withdrawal>> {
    return this.client.post<ApiResponse<Withdrawal>>(
      `/users/${userId}/withdraws`,
      data
    );
  }

  createBankWithdrawal(
    userId: string,
    data: CreateBankWithdrawalRequest
  ): Promise<ApiResponse<Withdrawal>> {
    return this.client.post<ApiResponse<Withdrawal>>(
      `/users/${userId}/withdraws`,
      data
    );
  }

  getWithdrawalDetail(
    userId: string,
    withdrawalId: string
  ): Promise<ApiResponse<Withdrawal>> {
    return this.client.get<ApiResponse<Withdrawal>>(
      `/users/${userId}/withdraws/${withdrawalId}`
    );
  }

  cancelWithdrawal(
    userId: string,
    withdrawalId: string
  ): Promise<ApiResponse<Withdrawal>> {
    return this.client.post<ApiResponse<Withdrawal>>(
      `/users/${userId}/withdraws/${withdrawalId}/cancel`,
      {}
    );
  }

  getWithdrawalByReference(
    userId: string,
    reference: string
  ): Promise<ApiResponse<Withdrawal>> {
    return this.client.get<ApiResponse<Withdrawal>>(
      `/users/${userId}/withdraws/reference/${reference}`
    );
  }
}
