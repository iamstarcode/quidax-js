export interface SwapQuotation {
  id: string;
  from_currency: string;
  to_currency: string;
  from_amount: string;
  to_amount: string;
  quoted_currency: string;
  quoted_price: string;
  confirmed: boolean;
  expires_at: string;
  created_at: string;
  updated_at: string;
  user?: Record<string, unknown>;
}

export interface SwapTransaction {
  id: string;
  from_currency: string;
  to_currency: string;
  from_amount: string;
  to_amount: string;
  rate: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSwapRequest {
  from_currency: string;
  to_currency: string;
  from_amount: string;
}

export interface RefreshSwapRequest {
  from_currency: string;
  to_currency: string;
  from_amount: string;
}
