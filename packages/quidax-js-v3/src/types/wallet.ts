export interface WalletUser {
  id: string;
  sn: string;
  email: string;
  reference: string | null;
  first_name: string;
  last_name: string;
  display_name: string;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  name: string;
  currency: string;
  balance: string;
  locked: string;
  staked: string;
  converted_balance: string;
  reference_currency: string;
  is_crypto: boolean;
  created_at: string;
  updated_at: string;
  blockchain_enabled: boolean;
  default_network: string | null;
  networks: string[];
  deposit_address: string | null;
  destination_tag: string | null;
  user: WalletUser;
}

export interface PaymentAddress {
  id: string;
  address: string;
  network: string;
  currency: string;
  tag?: string;
  memo?: string;
  created_at: string;
}
