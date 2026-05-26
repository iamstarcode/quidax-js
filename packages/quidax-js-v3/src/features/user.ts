import { HttpClient } from '../client/HttpClient';
import type { ApiResponse } from '../types';
import {
  SubAccount,
  CreateSubAccountRequest,
  EditSubAccountRequest,
} from '../types';

export class User {
  constructor(private client: HttpClient) {}

  createSubaccount(
    data: CreateSubAccountRequest
  ): Promise<ApiResponse<SubAccount>> {
    return this.client.post<ApiResponse<SubAccount>>('/users', data);
  }

  getParentAccount(): Promise<ApiResponse<SubAccount>> {
    return this.client.get<ApiResponse<SubAccount>>('/users/parent');
  }

  getSubAccount(userId: string): Promise<ApiResponse<SubAccount>> {
    return this.client.get<ApiResponse<SubAccount>>(`/users/${userId}`);
  }

  getAllSubAccounts(): Promise<ApiResponse<SubAccount[]>> {
    return this.client.get<ApiResponse<SubAccount[]>>('/users');
  }

  editSubAccount(
    userId: string,
    data: EditSubAccountRequest
  ): Promise<ApiResponse<SubAccount>> {
    return this.client.put<ApiResponse<SubAccount>>(`/users/${userId}`, data);
  }
}
