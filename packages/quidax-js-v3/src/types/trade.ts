export interface Trade {
  id: string;
  market: string;
  price: string;
  volume: string;
  funds: string;
  side: 'buy' | 'sell';
  created_at: string;
}
