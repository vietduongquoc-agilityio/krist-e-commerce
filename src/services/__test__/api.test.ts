import { apiClient } from '../api';

// Constants
import { ERROR_MESSAGES, SERVER_URL } from '@/constants';

describe('APIClient', () => {
  const mockFetch = jest.fn();
  const originalFetch = global.fetch;

  const mockResponse = <T>(data: T, ok = true) => ({
    ok,
    json: async () => data,
  });

  beforeEach(() => {
    global.fetch = mockFetch as any;
    jest.clearAllMocks();
    apiClient.setToken(undefined); // reset token

    mockFetch.mockResolvedValue(mockResponse({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('should call GET and return success', async () => {
    const mockData = { name: 'John' };
    mockFetch.mockResolvedValueOnce(mockResponse(mockData));

    const res = await apiClient.get<typeof mockData>('/users');
    expect(res).toEqual({ data: mockData, error: null });
    expect(mockFetch).toHaveBeenCalledWith(
      `${SERVER_URL}/users`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('should call POST with body and return success', async () => {
    const mockData = { id: 1 };
    mockFetch.mockResolvedValueOnce(mockResponse(mockData));

    const body = { name: 'John' };
    const res = await apiClient.post<typeof mockData>('/users', { body });
    expect(res).toEqual({ data: mockData, error: null });
    expect(mockFetch).toHaveBeenCalledWith(
      `${SERVER_URL}/users`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(body),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should send Authorization header if token is set', async () => {
    apiClient.setToken('abc123');

    await apiClient.get('/profile');
    expect(mockFetch).toHaveBeenCalledWith(
      `${SERVER_URL}/profile`,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer abc123',
        }),
      }),
    );
  });

  it('should call PUT and return success', async () => {
    const mockData = { updated: true };
    mockFetch.mockResolvedValueOnce(mockResponse(mockData));

    const res = await apiClient.put<typeof mockData>('/users/1', {
      body: { name: 'Jane' },
    });
    expect(res).toEqual({ data: mockData, error: null });
    expect(mockFetch).toHaveBeenCalledWith(
      `${SERVER_URL}/users/1`,
      expect.objectContaining({ method: 'PUT' }),
    );
  });

  it('should call DELETE and return success', async () => {
    const mockData = { deleted: true };
    mockFetch.mockResolvedValueOnce(mockResponse(mockData));

    const res = await apiClient.delete('/users/1');
    expect(res).toEqual({ data: mockData, error: null });
    expect(mockFetch).toHaveBeenCalledWith(
      `${SERVER_URL}/users/1`,
      expect.objectContaining({ method: 'DELETE' }),
    );
  });

  it('should return FailedResponse if fetch returns not ok', async () => {
    const errorData = { data: null, error: { message: 'Not found' } };
    mockFetch.mockResolvedValueOnce(mockResponse(errorData, false));

    const res = await apiClient.get('/not-found');
    expect(res).toEqual(errorData);
  });

  it('should return error when fetch throws', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network fail'));

    const res = await apiClient.get('/error');
    expect(res).toEqual({
      error: { message: 'Error : Network fail' },
      data: null,
    });
  });

  it('should return default error when non-Error thrown', async () => {
    mockFetch.mockRejectedValueOnce('unknown');

    const res = await apiClient.get('/error');
    expect(res).toEqual({
      error: { message: ERROR_MESSAGES.ERROR_TO_FETCH_API },
      data: null,
    });
  });
});
