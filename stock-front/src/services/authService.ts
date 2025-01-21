import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const loginWithGoogle = () => {
  return axios.get(`${BASE_URL}/auth/google`);
};

export const loginWithMicrosoft = () => {
  return axios.get(`${BASE_URL}/auth/microsoft`);
};

export const registerUser = (userData: { name: string; email: string; password: string }) => {
  return axios.post(`${BASE_URL}/register`, userData);
};
