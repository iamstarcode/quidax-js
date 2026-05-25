import { QuidaxApiError, QuidaxError } from './errors';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  auth?: boolean;
  body?: unknown;
  params?: Record<string, string | undefined>;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export class HttpClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(config?: { apiKey?: string; baseUrl?: string }) {
    this.apiKey = config?.apiKey;
    this.baseUrl =
      config?.baseUrl ||
      'https://openapi.quidax.io/exchange-open-api/api/v1';
  }

  private async request<T>(
    method: HttpMethod,
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const auth = options.auth ?? true;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (auth) {
      if (!this.apiKey) {
        throw new QuidaxError(
          'API key is required for this endpoint. Pass an apiKey when creating the Quidax client.',
          401,
          'API_KEY_REQUIRED'
        );
      }
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    let url = `${this.baseUrl}${path}`;

    if (options.params) {
      const filtered = Object.entries(options.params).filter(
        ([, v]) => v !== undefined
      );
      if (filtered.length > 0) {
        const searchParams = new URLSearchParams(
          filtered as [string, string][]
        );
        url += `?${searchParams.toString()}`;
      }
    }

    const fetchOptions: RequestInit = { method, headers };

    if (options.body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(options.body);
    }

    let response: Response;
    try {
      response = await fetch(url, fetchOptions);
    } catch (error) {
      throw new QuidaxError(
        error instanceof Error ? error.message : 'Network request failed',
        0,
        'NETWORK_ERROR'
      );
    }

    if (!response.ok) {
      let errorBody: any;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = { message: response.statusText };
      }
      throw new QuidaxApiError(
        errorBody.message || 'Unknown API error',
        response.status,
        errorBody.code,
        errorBody
      );
    }

    let json: ApiResponse<T>;
    try {
      json = await response.json();
    } catch {
      throw new QuidaxApiError(
        `Invalid JSON response from ${method} ${path}`,
        response.status,
        'INVALID_RESPONSE'
      );
    }
    return json.data;
  }

  async get<T>(
    path: string,
    options?: { auth?: boolean; params?: Record<string, string | undefined> }
  ): Promise<T> {
    return this.request<T>('GET', path, options);
  }

  async post<T>(
    path: string,
    body?: unknown,
    options?: { auth?: boolean; params?: Record<string, string | undefined> }
  ): Promise<T> {
    return this.request<T>('POST', path, { ...options, body });
  }

  async put<T>(
    path: string,
    body?: unknown,
    options?: { auth?: boolean; params?: Record<string, string | undefined> }
  ): Promise<T> {
    return this.request<T>('PUT', path, { ...options, body });
  }

  async delete<T>(
    path: string,
    body?: unknown,
    options?: { auth?: boolean; params?: Record<string, string | undefined> }
  ): Promise<T> {
    return this.request<T>('DELETE', path, { ...options, body });
  }
}
