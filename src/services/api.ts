// Constants
import { ERROR_MESSAGES, SERVER_URL } from '@/constants';

type RequestOption = Omit<RequestInit, 'body'> & { body?: object };

export type SuccessResponse<T> = { data: T; error: null };
export type FailedResponse = { data: null; error: { message: string } };

class APIClient {
  private static _apiClient: APIClient;
  private jwtToken?: string;

  private constructor() {}

  static get apiClient() {
    if (!this._apiClient) {
      this._apiClient = new APIClient();
    }
    return this._apiClient;
  }

  setToken(token?: string) {
    this.jwtToken = token;
  }

  private apiRequest = async <T>(
    url: string,
    init?: RequestOption,
  ): Promise<SuccessResponse<T> | FailedResponse> => {
    const { method = 'GET', body, headers = {}, ...rest } = init || {};

    const hasBody = method === 'POST' || method === 'PUT';

<<<<<<< Updated upstream
    const customHeader: Record<string, string> = {
      ...(headers as Record<string, string>),
      ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
      ...(hasBody && { 'Content-Type': 'application/json' }),
=======
    const authHeader = this.jwtToken
      ? { Authorization: `Bearer ${this.jwtToken}` }
      : {};

    const customHeader: Record<string, string> = {
      ...(headers as Record<string, string>),
      ...(authHeader as Record<string, string>),
      ...(hasBody && {
        'Content-Type': 'application/json',
      }),
>>>>>>> Stashed changes
    };

    if (!this.jwtToken && 'Authorization' in customHeader) {
      delete customHeader['Authorization'];
    }

    const options = {
      method,
      headers: customHeader,
      ...(hasBody && {
        body: JSON.stringify(body),
      }),
      ...rest,
    };

    try {
      const fullUrl = `${SERVER_URL}${url.startsWith('/') ? '' : '/'}${url}`;

      const res = await fetch(fullUrl, options);

      if (!res.ok) return (await res.json()) as FailedResponse;

      return {
        data: (await res.json()) as T,
        error: null,
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: { message: `Error : ${error.message}` }, data: null };
      }

      return {
        error: { message: ERROR_MESSAGES.ERROR_TO_FETCH_API },
        data: null,
      };
    }
  };

  async get<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, init);
  }

  async post<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, { ...init, method: 'POST' });
  }

  async put<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, { ...init, method: 'PUT' });
  }

  async delete(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest(url, { ...init, method: 'DELETE' });
  }
}

export const apiClient = APIClient.apiClient;
