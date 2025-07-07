import { API_URL, handleResponse } from "./api"; 

const authApiUrl = `${API_URL}/auth`; 

export const authService = {
  async register(userData: { email: string; password: string }) {
    const response = await fetch(`${authApiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  async login(credentials: { email: string; password: string }) {
    const formData = new URLSearchParams();
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await fetch(`${authApiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
    return handleResponse(response);
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
  }
};