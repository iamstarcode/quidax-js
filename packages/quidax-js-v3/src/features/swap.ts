import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
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
  ): Promise<ApiResponse<SwapQuotation>> {
    return this.client.post<ApiResponse<SwapQuotation>>(
      `/users/${userId}/swap_quotation`,
      data
    );
  }

  confirmSwap(
    userId: string,
    quotationId: string
  ): Promise<ApiResponse<SwapTransaction>> {
    return this.client.post<ApiResponse<SwapTransaction>>(
      `/users/${userId}/swap_quotation/${quotationId}/confirm`,
      {}
    );
  }

  refreshSwap(
    userId: string,
    quotationId: string,
    data: RefreshSwapRequest
  ): Promise<ApiResponse<SwapQuotation>> {
    return this.client.post<ApiResponse<SwapQuotation>>(
      `/users/${userId}/swap_quotation/${quotationId}/refresh`,
      data
    );
  }

  temporarySwapQuotation(
    userId: string,
    data: CreateSwapRequest
  ): Promise<ApiResponse<SwapQuotation>> {
    return this.client.post<ApiResponse<SwapQuotation>>(
      `/users/${userId}/temporary_swap_quotation`,
      data
    );
  }

  getSwapTransaction(
    userId: string,
    transactionId: string
  ): Promise<ApiResponse<SwapTransaction>> {
    return this.client.get<ApiResponse<SwapTransaction>>(
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
  ): Promise<ApiResponse<SwapTransaction[]>> {
    return this.client.get<ApiResponse<SwapTransaction[]>>(
      `/users/${userId}/swap_transactions`,
      { params }
    );
  }
}
