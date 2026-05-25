import axios from 'axios';
import handleError from '../errors/handleError';
import { BASE_URL } from '../constants';

class Fee {
  public baseUrl: string;

  public options: { headers: { Authorization: string } };

  constructor(public apiKey: string) {
    this.baseUrl = `${BASE_URL}/fee`;
    this.options = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };
  }

  public async getCryptoWithdrawalFee(currency: string, network: string) {
    try {
      const response = await axios.get(`${this.baseUrl}`, {
        ...this.options,
        params: {
          currency,
          network,
        },
      });

      const { data } = response;
      if (data?.response?.status > 300) {
        throw Error(data);
      }

      return data;
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default Fee;
