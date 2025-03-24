import axios from 'axios';
import { AdminLoginResponse, Analytics, ApiResponse, KnowledgeBase } from './responseType';
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

export const getKnowledgebase = async () => {
  const { data } = await adminApi.get<ApiResponse<KnowledgeBase[]>>('/knowledge-base');
  return data.data;
};

export const getKnowledgebaseById = async (id: string) => {
  const { data } = await adminApi.get<ApiResponse<KnowledgeBase>>(`/knowledge-base/${id}`);
  return data.data;
};

interface TUploadBody {
  fileName: string;
  fileUrl: string;
  indexName: string;
  knowledgebaseId: string;
}

export const uploadDocument = async (body: TUploadBody) => {
  const { data } = await adminApi.post<ApiResponse>('/knowledge-base/document/upload', body);
  return data;
};

export const uploadYTVideo = async (body: TUploadBody) => {
  const { data } = await adminApi.post<ApiResponse>('/knowledge-base/yt-video/upload', body);
  return data.data;
};
