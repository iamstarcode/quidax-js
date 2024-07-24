import axios from 'axios';
import CustomError from '../errors';
import handleError from '../errors/handleError';

class Swap {
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

  public async createSwap({
    userId,
    fromAmount,
    toCurrency,
    fromCurrency,
  }: {
    userId: string;
    fromCurrency: string;
    toCurrency: string;
    fromAmount: string;
  }) {
    const body = {
      from_currency: fromCurrency,
      to_currency: toCurrency,
      from_amount: fromAmount,
    };
    try {
      const response = await axios.post(
        `${this.baseUrl}/${userId}/swap_quotation`,
        body,
        this.options
      );
      const { data } = response;
      if (data?.response?.status > 300) {
        throw Error(data);
      }

      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  }

  public async confirmSwap({
    userId,
    quotationId,
  }: {
    userId: string;
    quotationId: string;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${userId}/swap_quotation/${quotationId}/confirm`,
        {},
        this.options
      );
      const { data } = response;
      if (data?.response?.status > 300) {
        throw Error(data);
      }

      return response.data;
    } catch (error) {
      // CustomError.processError(error);
      throw handleError(error);
    }
  }

  public async refreshSwap({
    userId,
    quotationId,
    fromAmount,
    toCurrency,
    fromCurrency,
  }: {
    userId: string;
    quotationId: string;
    fromCurrency: string;
    toCurrency: string;
    fromAmount: string;
  }) {
    const body = {
      from_currency: fromCurrency,
      to_currency: toCurrency,
      from_amount: fromAmount,
    };
    try {
      const response = await axios.post(
        `${this.baseUrl}/${userId}/swap_quotation/${quotationId}/refresh`,
        body,
        this.options
      );
      const { data } = response;
      if (data?.response?.status > 300) {
        throw Error(data);
      }

      return response.data;
    } catch (error) {
      // CustomError.processError(error);
      throw handleError(error);
    }

    return null;
  }
}

export default Swap;
