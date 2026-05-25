export interface TickerData {
  buy: string;
  sell: string;
  low: string;
  high: string;
  last: string;
  open: string;
  vol: string;
}

export interface RawTickerEntry {
  at: number;
  ticker: TickerData;
}

export interface MarketTicker {
  market: string;
  at: number;
  buy: string;
  sell: string;
  low: string;
  high: string;
  last: string;
  open: string;
  vol: string;
}

export interface Market {
  id: string;
  name: string;
  base_unit: string;
  quote_unit: string;
  filters: Record<string, unknown>;
  trading_rules: {
    base_precision: number;
    quote_precision: number;
    price_precision: number;
    minimum_order_size: number;
  };
}

export interface KLine {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface OrderBookEntry {
  price: string;
  volume: string;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export interface DepthData {
  bids: [string, string][];
  asks: [string, string][];
}

export interface MarketSummary {
  last_price: string;
  lowest_ask: string;
  highest_bid: string;
  base_volume: string;
  quote_volume: string;
  price_change_percent_24h: string;
  highest_price_24h: string;
  lowest_price_24h: string;
}
