import axios from 'axios';
import handleError from '../errors/handleError';
import { BASE_URL } from '../constants';

class Deposit {
  public baseUrl: string;

  public options: { headers: { Authorization: string } };

  constructor(public apiKey: string) {
    this.baseUrl = `${BASE_URL}/users`;
    this.options = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };
  }

  public async getDeposit(userId: string, depositId: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${userId}/deposits/${depositId}`,
        this.options
      );

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

export default Deposit;
