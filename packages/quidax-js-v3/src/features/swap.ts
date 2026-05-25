import { HttpClient } from '../client/HttpClient';
import {
  SwapQuotation,
  SwapTransaction,
  CreateSwapRequest,
  RefreshSwapRequest,
} from '../types';

export class Swap {
  constructor(private client: HttpClient) {}

  createSwap(
    userId: string,
    data: CreateSwapRequest
  ): Promise<SwapQuotation> {
    return this.client.post<SwapQuotation>(
      `/users/${userId}/swap_quotation`,
      data
    );
  }

  confirmSwap(
    userId: string,
    quotationId: string
  ): Promise<SwapTransaction> {
    return this.client.post<SwapTransaction>(
      `/users/${userId}/swap_quotation/${quotationId}/confirm`,
      {}
    );
  }

  refreshSwap(
    userId: string,
    quotationId: string,
    data: RefreshSwapRequest
  ): Promise<SwapQuotation> {
    return this.client.post<SwapQuotation>(
      `/users/${userId}/swap_quotation/${quotationId}/refresh`,
      data
    );
  }

  temporarySwapQuotation(
    userId: string,
    data: CreateSwapRequest
  ): Promise<SwapQuotation> {
    return this.client.post<SwapQuotation>(
      `/users/${userId}/temporary_swap_quotation`,
      data
    );
  }

  getSwapTransaction(
    userId: string,
    transactionId: string
  ): Promise<SwapTransaction> {
    return this.client.get<SwapTransaction>(
      `/users/${userId}/swap_transactions/${transactionId}`
    );
  }

  getSwapTransactions(
    userId: string,
    params?: {
      from_currency?: string;
      to_currency?: string;
      status?: string;
    }
  ): Promise<SwapTransaction[]> {
    return this.client.get<SwapTransaction[]>(
      `/users/${userId}/swap_transactions`,
      { params }
    );
  }
}
