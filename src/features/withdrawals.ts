import axios from 'axios';
import CustomError from '../errors';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} apiKey - The public key of the merchant
 * @param {string} merchantId - The id of the merchant
 */
class Withdrawals {
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

  /**
   * Creates a withdrawal request for the user.
   * @param {Object} params - The parameters for creating a withdrawal.
   * @param {string} params.userId - The User ID. Use 'me' if you are creating withdrawal from the master account, use the user_id if creating withdrawal from the Sub-account linked to the authenticated user.
   * @param {string} params.currency - The currency to withdraw.
   * @param {string} params.amount - The amount to withdraw.
   * @param {string} params.fundUid - This can be the id of your sub user, or crypto address. Note! When trying to tranfser to parent account you can't use [me] but rather the user_id of parent account
   * @param {string} [params.transactionNote] - Note for the transaction.
   * @param {string} [params.narration] - A narration for the transaction.
   * @param {string} [params.fundUid2] - A optional second unique identifier for the fund.
   * @param {string} [params.network] - Blockchain network for the transaction, here is to the supported blockchain page: [supported networks](https://docs.quidax.ng/docs/supported-cryptocurrencies)
   * @returns {Promise<any | undefined>} The response data from the withdrawal request or undefined if an error occurs.
   */
  public async createWithdrawal({
    userId,
    currency,
    amount,
    fundUid,
    transactionNote,
    narration,
    fundUid2,
    network,
  }: {
    userId: string;
    currency: string;
    amount: string;
    fundUid: string;
    transactionNote?: string;
    narration?: string;
    fundUid2?: string;
    network?: string;
  }): Promise<any | undefined> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/users/${userId}/withdraws`,
        {
          currency,
          amount,
          fund_uid: fundUid,
          transaction_note: transactionNote,
          narration,
          fundUid2,
          network,
        },
        {
          ...this.options,
        }
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

  public async getWithdrawalDetail({
    userId,
    withdrawalId,
  }: {
    userId: string;
    withdrawalId: string;
  }) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/users/${userId}/withdraws/${withdrawalId}`,
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

export default Withdrawals;
