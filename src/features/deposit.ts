import axios from 'axios';
import CustomError from '../errors';
import handleError from '../errors/handleError';

class Deposit {
  public baseUrl: string;

  public options: { headers: { Authorization: string } };

  constructor(public apiKey: string) {
    this.baseUrl = 'https://www.quidax.com/api/v1/users';
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
    return null;
  }
}

export default Deposit;
