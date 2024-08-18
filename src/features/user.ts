import axios from 'axios';
import CustomError from '../errors';
import handleError from '../errors/handleError';

class User {
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

  public async createSubaccount(
    email: string,
    firstname: string,
    lastname: string
  ) {
    const body = {
      email,
      firstname,
      lastname,
    };
    try {
      const response = await axios.post(`${this.baseUrl}`, body, this.options);
      const { data } = response;
      if (data?.response?.status > 300) {
        throw Error(data);
      }

      return data;
    } catch (error) {
      throw handleError(error);
    }
  }

  public async getSubAccount(userId: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${userId}`,
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

  public async getAllSubAccounts() {
    try {
      const response = await axios.get(`${this.baseUrl}`, this.options);

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

export default User;
