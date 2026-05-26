import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
import { Trade } from '../types';

export class Trades {
  constructor(private client: HttpClient) {}

  getMarketTrades(
    market: string,
    params?: { limit?: number; page?: number }
  ): Promise<ApiResponse<Trade[]>> {
    return this.client.get<ApiResponse<Trade[]>>(
      `/markets/${market}/trades`,
      {
        auth: false,
        params: {
          limit: params?.limit?.toString(),
          page: params?.page?.toString(),
        },
      }
    );
  }

  getRecentTrades(
    market: string,
    params?: { limit?: number }
  ): Promise<ApiResponse<Trade[]>> {
    return this.client.get<ApiResponse<Trade[]>>(
      `/markets/${market}/trades/recent`,
      {
        auth: false,
        params: { limit: params?.limit?.toString() },
      }
    );
  }
}
