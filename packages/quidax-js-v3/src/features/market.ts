import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
import type {
  Market,
  RawTickerEntry,
  TickerData,
  KLine,
  OrderBook,
  DepthData,
  MarketSummary,
} from '../types';

type SingleTicker = RawTickerEntry & { market: string };

export class Markets {
  constructor(private client: HttpClient) {}

  listAllMarkets(): Promise<ApiResponse<Market[]>> {
    return this.client.get<ApiResponse<Market[]>>('/markets', { auth: false });
  }

  getMarketTickers(): Promise<ApiResponse<Record<string, RawTickerEntry>>> {
    return this.client.get<ApiResponse<Record<string, RawTickerEntry>>>(
      '/markets/tickers',
      { auth: false }
    );
  }

  getMarketTicker(
    market: string
  ): Promise<ApiResponse<SingleTicker>> {
    return this.client.get<ApiResponse<SingleTicker>>(
      `/markets/tickers/${market}`,
      { auth: false }
    );
  }

  getKLine(
    market: string,
    params?: {
      period?: number;
      before?: number;
      after?: number;
      limit?: number;
    }
  ): Promise<ApiResponse<KLine[]>> {
    return this.client.get<ApiResponse<KLine[]>>(
      `/markets/${market}/k-line`,
      {
        params: {
          period: params?.period?.toString(),
          before: params?.before?.toString(),
          after: params?.after?.toString(),
          limit: params?.limit?.toString(),
        },
      }
    );
  }

  getKLinePending(market: string): Promise<ApiResponse<KLine[]>> {
    return this.client.get<ApiResponse<KLine[]>>(
      `/markets/${market}/k-line/pending`
    );
  }

  getOrderBook(market: string): Promise<ApiResponse<OrderBook>> {
    return this.client.get<ApiResponse<OrderBook>>(
      `/markets/${market}/order_book`
    );
  }

  getDepthData(market: string): Promise<ApiResponse<DepthData>> {
    return this.client.get<ApiResponse<DepthData>>(
      `/markets/${market}/depth`
    );
  }

  getMarketsSummary(): Promise<ApiResponse<Record<string, MarketSummary>>> {
    return this.client.get<ApiResponse<Record<string, MarketSummary>>>(
      '/markets/summary',
      { auth: false }
    );
  }
}
