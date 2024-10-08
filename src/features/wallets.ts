import axios from 'axios';
import CustomError from '../errors';
import handleError from '../errors/handleError';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} apiKey - The public key of the merchant
 */

class Wallets {
  public baseUrl: string;

  public options: { headers: { Authorization: string } };

  constructor(public apiKey: string) {
    this.baseUrl = 'https://www.quidax.com/api/v1';
    this.options = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };
  }

  public async getUserWallets(userId: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/users/${userId}/wallets`,
        this.options
      );
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  }

  public async getUserWallet(userId: string, currency: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/users/${userId}/wallets/${currency}`,
        this.options
      );
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  }

  public async getPaymentAddress(userId: string, currency: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/users/${userId}/wallets/${currency}/address`,
        this.options
      );

      const { data } = response;

      return data;
    } catch (error) {
      throw handleError(error);
    }
  }

  public async getPaymentAddresses(userId: string, currency: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/users/${userId}/wallets/${currency}/addresses`,
        this.options
      );

      const { data } = response;

      return data;
    } catch (error) {
      throw handleError(error);
    }
  }

  public async getPaymentAddressById(
    userId: string,
    currency: string,
    addressId: string
  ) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/users/${userId}/wallets/${currency}/addresses/${addressId}`,
        this.options
      );

      const { data } = response;

      return data;
    } catch (error) {
      throw handleError(error);
    }
  }

  public async createPaymentAddress(
    userId: string,
    currency: string,
    network?: any
  ) {
    try {
      let url: string;

      if (network === undefined) {
        url = `${this.baseUrl}/users/${userId}/wallets/${currency}/addresses`;
      } else {
        url = `${this.baseUrl}/users/${userId}/wallets/${currency}/addresses?network=${network}`;
      }

      const response = await axios.post(url, null, this.options);

      const { data } = response;

      return data;
    } catch (error) {
      throw handleError(error);
    }
  }
}

export default Wallets;
