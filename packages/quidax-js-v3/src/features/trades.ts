import { HttpClient } from '../client/HttpClient';
import { Trade } from '../types';

export class Trades {
  constructor(private client: HttpClient) {}

  getMarketTrades(
    market: string,
    params?: { limit?: number; page?: number }
  ): Promise<Trade[]> {
    return this.client.get<Trade[]>(`/markets/${market}/trades`, {
      auth: false,
      params: {
        limit: params?.limit?.toString(),
        page: params?.page?.toString(),
      },
    });
  }

  getRecentTrades(
    market: string,
    params?: { limit?: number }
  ): Promise<Trade[]> {
    return this.client.get<Trade[]>(
      `/markets/${market}/trades/recent`,
      {
        auth: false,
        params: { limit: params?.limit?.toString() },
      }
    );
  }
}
