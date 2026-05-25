import { HttpClient } from '../client/HttpClient';
import { WithdrawalFee } from '../types';

export class Fee {
  constructor(private client: HttpClient) {}

  getCryptoWithdrawalFee(
    currency: string,
    network: string
  ): Promise<WithdrawalFee> {
    return this.client.get<WithdrawalFee>('/fee', {
      params: { currency, network },
    });
  }
}
