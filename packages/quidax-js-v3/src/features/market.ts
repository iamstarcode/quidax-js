import { HttpClient } from '../client/HttpClient';
import {
  Market,
  MarketTicker,
  RawTickerEntry,
  KLine,
  OrderBook,
  DepthData,
  MarketSummary,
} from '../types';

export class Markets {
  constructor(private client: HttpClient) {}

  async listAllMarkets(): Promise<Market[]> {
    const raw = await this.client.get<Record<string, Market>>('/markets', {
      auth: false,
    });
    return Object.values(raw);
  }

  async getMarketTickers(): Promise<MarketTicker[]> {
    const raw = await this.client.get<Record<string, RawTickerEntry>>(
      '/markets/tickers',
      { auth: false }
    );
    return Object.entries(raw).map(([market, entry]) => ({
      market,
      at: entry.at,
      buy: entry.ticker.buy,
      sell: entry.ticker.sell,
      low: entry.ticker.low,
      high: entry.ticker.high,
      last: entry.ticker.last,
      open: entry.ticker.open,
      vol: entry.ticker.vol,
    }));
  }

  async getMarketTicker(market: string): Promise<MarketTicker> {
    const raw = await this.client.get<Record<string, RawTickerEntry>>(
      `/markets/tickers/${market}`,
      { auth: false }
    );
    const entry = raw[market];
    return {
      market,
      at: entry.at,
      buy: entry.ticker.buy,
      sell: entry.ticker.sell,
      low: entry.ticker.low,
      high: entry.ticker.high,
      last: entry.ticker.last,
      open: entry.ticker.open,
      vol: entry.ticker.vol,
    };
  }

  getKLine(
    market: string,
    params?: {
      period?: number;
      before?: number;
      after?: number;
      limit?: number;
    }
  ): Promise<KLine[]> {
    return this.client.get<KLine[]>(`/markets/${market}/k-line`, {
      params: {
        period: params?.period?.toString(),
        before: params?.before?.toString(),
        after: params?.after?.toString(),
        limit: params?.limit?.toString(),
      },
    });
  }

  getKLinePending(market: string): Promise<KLine[]> {
    return this.client.get<KLine[]>(`/markets/${market}/k-line/pending`);
  }

  getOrderBook(market: string): Promise<OrderBook> {
    return this.client.get<OrderBook>(`/markets/${market}/order_book`);
  }

  getDepthData(market: string): Promise<DepthData> {
    return this.client.get<DepthData>(`/markets/${market}/depth`);
  }

  async getMarketsSummary(): Promise<MarketSummary[]> {
    const raw = await this.client.get<Record<string, MarketSummary>>(
      '/markets/summary',
      { auth: false }
    );
    return Object.values(raw);
  }
}
