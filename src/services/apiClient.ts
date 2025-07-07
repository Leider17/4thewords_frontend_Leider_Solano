import { API_URL, handleResponse } from "./api";
import router from "../routes/router";

async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const accessToken = localStorage.getItem('access_token');
  const tokenType = localStorage.getItem('token_type') || 'Bearer';

  const headers: HeadersInit = { 
    ...(options?.headers as Record<string, string>)
  };

  if (accessToken) {
    headers['Authorization'] = `${tokenType} ${accessToken}`;
  } else {
    router.push('/login');
    throw new Error("access token not found");
  }

  if (options?.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const config: RequestInit = {
    ...options,
    headers: headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  return handleResponse(response);
}

export const http = {
  get: <T>(endpoint: string, options?: RequestInit) => apiClient<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body: any, options?: RequestInit) => apiClient<T>(endpoint, { ...options, method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: <T>(endpoint: string, body: any, options?: RequestInit) => apiClient<T>(endpoint, { ...options, method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) }),
  patch: <T>(endpoint: string, body: any, options?: RequestInit) => apiClient<T>(endpoint, { ...options, method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body) }),
  delete: <T>(endpoint: string, options?: RequestInit) => apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};