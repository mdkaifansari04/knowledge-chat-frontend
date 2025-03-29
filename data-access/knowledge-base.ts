import axios from 'axios';
import { ApiResponse, KnowledgeBase } from './responseType';
import tokenInterceptors from './tokenInterceptor';

const knowledgebaseApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/knowledge-base` });
knowledgebaseApi.interceptors.request.use(tokenInterceptors);

export const chatWithKnowledgebase = async (body: { userPrompt: string; indexName: string; sessionId: string; userId: string }) => {
  const response: Response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/knowledge-base/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userPrompt: body.userPrompt,
      indexName: body.indexName,
      sessionId: body.sessionId,
      userId: body.userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chat response');
  }

  console.log(response);

  return response;
};

interface TUploadBody {
  fileName: string;
  fileUrl?: string;
  indexName: string;
  text?: string;
  knowledgebaseId: string;
}
// ================== GET Request ================================

export const getKnowledgebase = async () => {
  const { data } = await knowledgebaseApi.get<ApiResponse<KnowledgeBase[]>>('/');
  return data.data;
};

export const getKnowledgebaseById = async (id: string) => {
  const { data } = await knowledgebaseApi.get<ApiResponse<KnowledgeBase>>(`/${id}`);
  return data.data;
};

// ================== POST Request ================================

export const uploadDocument = async (body: TUploadBody) => {
  const { data } = await knowledgebaseApi.post<ApiResponse>('/document/upload', body);
  return data;
};

export const uploadYTVideo = async (body: TUploadBody) => {
  const { data } = await knowledgebaseApi.post<ApiResponse>('/yt-video/upload', body);
  return data.data;
};

export const uploadText = async (body: TUploadBody) => {
  const { data } = await knowledgebaseApi.post<ApiResponse>('/text/upload', body);
  return data.data;
};

export const uploadMedia = async (body: TUploadBody) => {
  const { data } = await knowledgebaseApi.post<ApiResponse>('/media/upload', body);
  return data.data;
};
