import * as AIModel from '@/data-access/aiModel';

import { useMutation } from '@tanstack/react-query';

export function useChatWithBlog() {
  return useMutation({
    mutationKey: ['chat-with-blogs'],
    mutationFn: AIModel.chatWithBlog,
  });
}
