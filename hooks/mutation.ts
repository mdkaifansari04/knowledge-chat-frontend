import * as Admin from '@/data-access/admin';
import * as AIModel from '@/data-access/aiModel';

import { useMutation } from '@tanstack/react-query';

export function useChatWithBlog() {
  return useMutation({
    mutationKey: ['chat-with-blogs'],
    mutationFn: AIModel.chatWithBlog,
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationKey: ['admin-login'],
    mutationFn: Admin.adminLogin,
  });
}

export function useUploadDocument() {
  return useMutation({
    mutationKey: ['admin-upload-document'],
    mutationFn: Admin.uploadDocument,
  });
}

export function useUploadYTVideo() {
  return useMutation({
    mutationKey: ['admin-upload-YT-video'],
    mutationFn: Admin.uploadYTVideo,
  });
}
