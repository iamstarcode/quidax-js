import axios from "axios";
import CustomError from "../errors";

class Fee {
  public baseUrl: string;

  public options: { headers: { Authorization: string } };

  constructor(public apiKey: string) {
    this.baseUrl = "https://www.quidax.com/api/v1/fee";
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
      CustomError.processError(error);
    }
    return null;
  }
}

export default Fee;
