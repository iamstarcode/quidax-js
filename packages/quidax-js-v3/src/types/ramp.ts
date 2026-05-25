export interface RampTransaction {
  id: string;
  type: string;
  currency: string;
  amount: string;
  status: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  provider: string;
  supported_currencies: string[];
}

export interface PurchaseLimit {
  currency: string;
  min_amount: string;
  max_amount: string;
}

export interface PurchaseQuote {
  currency: string;
  amount: string;
  rate: string;
  total: string;
  fees: string;
}
