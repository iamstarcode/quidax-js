import axios from 'axios';
import CustomError from '../errors';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} apiKey - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Markets {
  public baseUrl: string;

  public options: { headers: { Authorization: string } };

  constructor(public apiKey: string) {
    this.baseUrl = 'https://www.quidax.com/api/v1/markets';
    this.options = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };
  }

  public async getMarketTickers() {
    try {
      const response = await axios.get(`${this.baseUrl}/tickers`);

      const { data } = response;
      if (data?.response?.status > 300) {
        throw Error(data);
      }

      return data;
    } catch (error) {
      CustomError.processError(error);
    }

    return null;
  }

  public async getMarketTicker(currency: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/tickers/${currency}`,
        this.options
      );
      const { data } = response;
      if (data?.response?.status > 300) {
        throw Error(data);
      }

      return data;
    } catch (error) {
      CustomError.processError(error);
    }

    return null;
  }
}

export default Markets;
