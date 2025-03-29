import * as Admin from '@/data-access/admin';
import * as KnowledgeBase from '@/data-access/knowledge-base';

import { useMutation } from '@tanstack/react-query';

export function useChatWithKnowledgeBase() {
  return useMutation({
    mutationKey: ['chat-with-KnowledgeBase'],
    mutationFn: KnowledgeBase.chatWithKnowledgebase,
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
    mutationFn: KnowledgeBase.uploadDocument,
  });
}

export function useUploadYTVideo() {
  return useMutation({
    mutationKey: ['admin-upload-YT-video'],
    mutationFn: KnowledgeBase.uploadYTVideo,
  });
}
export function useUploadText() {
  return useMutation({
    mutationKey: ['admin-upload-text'],
    mutationFn: KnowledgeBase.uploadText,
  });
}

export function useMediaUpload() {
  return useMutation({
    mutationKey: ['admin-upload-media'],
    mutationFn: KnowledgeBase.uploadMedia,
  });
}
