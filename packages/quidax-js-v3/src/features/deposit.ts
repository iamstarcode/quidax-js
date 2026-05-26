import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
import type { Deposit as DepositData } from '../types';

export class Deposit {
  constructor(private client: HttpClient) {}

  getAllDeposits(
    userId: string,
    params?: {
      currency?: string;
      state?: string;
      order_by?: 'asc' | 'desc';
    }
  ): Promise<ApiResponse<DepositData[]>> {
    return this.client.get<ApiResponse<DepositData[]>>(
      `/users/${userId}/deposits`,
      {
        params: params as Record<string, string | undefined>,
      }
    );
  }

  getDeposit(
    userId: string,
    depositId: string
  ): Promise<ApiResponse<DepositData>> {
    return this.client.get<ApiResponse<DepositData>>(
      `/users/${userId}/deposits/${depositId}`
    );
  }

  getDepositsBySubUser(
    userId: string,
    params?: {
      currency?: string;
      state?: string;
      order_by?: 'asc' | 'desc';
    }
  ): Promise<ApiResponse<DepositData[]>> {
    return this.client.get<ApiResponse<DepositData[]>>(
      `/users/${userId}/sub_accounts/deposits`,
      {
        params: params as Record<string, string | undefined>,
      }
    );
  }
}
