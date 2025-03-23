import axios from 'axios';
import { AdminLoginResponse, Analytics, ApiResponse } from './responseType';
import tokenInterceptors from './tokenInterceptor';

const adminApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_HOST_URL });
adminApi.interceptors.request.use(tokenInterceptors);

export const adminLogin = async (body: { username: string; password: string }) => {
  const { data } = await adminApi.post<ApiResponse<AdminLoginResponse>>('/admin/login', body);
  return data.data;
};

export const getAnalytics = async () => {
  const { data } = await adminApi.get<ApiResponse<Analytics>>('/analytics');
  return data.data;
};
