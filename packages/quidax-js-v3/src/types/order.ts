export interface Order {
  id: string;
  market: string;
  side: 'buy' | 'sell';
  ord_type: string;
  price: string;
  volume: string;
  remaining_volume: string;
  executed_volume: string;
  state: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderRequest {
  market: string;
  side: 'buy' | 'sell';
  volume: string;
  price?: string;
  ord_type?: 'limit' | 'market';
}
