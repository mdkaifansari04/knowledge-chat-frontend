import axios from 'axios';
import { ApiResponse, Query } from './responseType';
import tokenInterceptors from './tokenInterceptor';

const queryApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/queries` });
queryApi.interceptors.request.use(tokenInterceptors);

export const getAllQuery = async () => {
  const { data } = await queryApi.get<ApiResponse<Query[]>>('/');
  return data.data;
};
