export interface WithdrawalRecipient {
  type: string;
  details: Record<string, unknown>;
}

export interface Withdrawal {
  id: string;
  reference: string;
  type: string;
  currency: string;
  amount: string;
  fee: string;
  stamp_duty_fee?: string;
  total: string;
  txid: string;
  transaction_note: string | null;
  narration: string | null;
  status: string;
  reason: string | null;
  created_at: string;
  done_at: string | null;
  recipient: WithdrawalRecipient;
}

export interface CreateWithdrawalRequest {
  currency: string;
  amount: string;
  fund_uid: string;
  transaction_note?: string;
  narration?: string;
  fund_uid2?: string;
  network?: string;
  reference?: string;
}

export interface CreateBankWithdrawalRequest {
  currency: string;
  amount: string;
  fund_uid: string;
  fund_uid2?: string;
  transaction_note?: string;
  narration?: string;
  reference: string;
}
