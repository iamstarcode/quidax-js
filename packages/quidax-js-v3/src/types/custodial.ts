export interface CustodialTransaction {
  id: string;
  type: 'on_ramp' | 'off_ramp';
  currency: string;
  amount: string;
  status: string;
  payment_method: string;
  reference: string;
  created_at: string;
  updated_at: string;
}

export interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  bank_code: string;
}

export interface InitiateOnRampRequest {
  currency: string;
  amount: string;
  payment_method: string;
  reference: string;
}

export interface InitiateOffRampRequest {
  currency: string;
  amount: string;
  fund_uid: string;
  fund_uid2?: string;
  reference: string;
}
