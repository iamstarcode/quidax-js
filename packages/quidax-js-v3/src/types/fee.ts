export interface RangeFeeItem {
  min: number;
  max: number;
  type: "flat";
  value: number;
}

export interface FlatWithdrawalFee {
  fee: number;
  type: "flat";
}

export interface RangeWithdrawalFee {
  fee: RangeFeeItem[];
  type: "range";
}

export type WithdrawalFee = FlatWithdrawalFee | RangeWithdrawalFee;
