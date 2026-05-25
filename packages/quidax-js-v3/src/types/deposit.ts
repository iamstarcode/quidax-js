export interface Deposit {
  id: string;
  currency: string;
  amount: string;
  fee: string;
  txid: string;
  status: string;
  confirmations: number;
  required_confirmations: number;
  created_at: string;
  updated_at: string;
  address: string;
  network: string;
}
