import axios from 'axios';


const API_URL = "/api/auth";

export const signIn = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const signUp = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};

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

