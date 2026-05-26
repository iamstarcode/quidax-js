import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
import { Order, CreateOrderRequest } from '../types';

export class Orders {
  constructor(private client: HttpClient) {}

  createOrder(
    userId: string,
    data: CreateOrderRequest
  ): Promise<ApiResponse<Order>> {
    return this.client.post<ApiResponse<Order>>(
      `/users/${userId}/orders`,
      data
    );
  }

  getAllOrders(
    userId: string,
    params?: {
      market?: string;
      state?: 'done' | 'wait' | 'cancel';
      order_by?: 'asc' | 'desc';
    }
  ): Promise<ApiResponse<Order[]>> {
    return this.client.get<ApiResponse<Order[]>>(
      `/users/${userId}/orders`,
      {
        params: params as Record<string, string | undefined>,
      }
    );
  }

  getOrderDetail(
    userId: string,
    orderId: string
  ): Promise<ApiResponse<Order>> {
    return this.client.get<ApiResponse<Order>>(
      `/users/${userId}/orders/${orderId}`
    );
  }

  cancelOrder(userId: string, orderId: string): Promise<ApiResponse<Order>> {
    return this.client.post<ApiResponse<Order>>(
      `/users/${userId}/orders/${orderId}/cancel`,
      {}
    );
  }
}
