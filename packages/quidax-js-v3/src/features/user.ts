import { HttpClient } from '../client/HttpClient';
import {
  SubAccount,
  CreateSubAccountRequest,
  EditSubAccountRequest,
} from '../types';

export class User {
  constructor(private client: HttpClient) {}

  createSubaccount(data: CreateSubAccountRequest): Promise<SubAccount> {
    return this.client.post<SubAccount>('/users', data);
  }

  getParentAccount(): Promise<SubAccount> {
    return this.client.get<SubAccount>('/users/parent');
  }

  getSubAccount(userId: string): Promise<SubAccount> {
    return this.client.get<SubAccount>(`/users/${userId}`);
  }

  getAllSubAccounts(): Promise<SubAccount[]> {
    return this.client.get<SubAccount[]>('/users');
  }

  editSubAccount(
    userId: string,
    data: EditSubAccountRequest
  ): Promise<SubAccount> {
    return this.client.put<SubAccount>(`/users/${userId}`, data);
  }
}
