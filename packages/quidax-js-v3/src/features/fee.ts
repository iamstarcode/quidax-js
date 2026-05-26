import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
import { WithdrawalFee } from '../types';

export class Fee {
  constructor(private client: HttpClient) {}

  getCryptoWithdrawalFee(
    currency: string,
    network: string
  ): Promise<ApiResponse<WithdrawalFee>> {
    return this.client.get<ApiResponse<WithdrawalFee>>('/fee', {
      params: { currency, network },
    });
  }
}
