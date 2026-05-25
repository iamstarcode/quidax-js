import { HttpClient } from '../client/HttpClient';
import { Order, CreateOrderRequest } from '../types';

export class Orders {
  constructor(private client: HttpClient) {}

  createOrder(
    userId: string,
    data: CreateOrderRequest
  ): Promise<Order> {
    return this.client.post<Order>(`/users/${userId}/orders`, data);
  }

  getAllOrders(
    userId: string,
    params?: {
      market?: string;
      state?: 'done' | 'wait' | 'cancel';
      order_by?: 'asc' | 'desc';
    }
  ): Promise<Order[]> {
    return this.client.get<Order[]>(`/users/${userId}/orders`, {
      params: params as Record<string, string | undefined>,
    });
  }

  getOrderDetail(
    userId: string,
    orderId: string
  ): Promise<Order> {
    return this.client.get<Order>(
      `/users/${userId}/orders/${orderId}`
    );
  }

  cancelOrder(userId: string, orderId: string): Promise<Order> {
    return this.client.post<Order>(
      `/users/${userId}/orders/${orderId}/cancel`,
      {}
    );
  }
}
