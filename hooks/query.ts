import * as Admin from '@/data-access/admin';
import * as KnowledgeBase from '@/data-access/knowledge-base';
import * as Query from '@/data-access/query';

import { useQuery } from '@tanstack/react-query';

export function useGetAlalytics() {
  return useQuery({
    queryKey: ['admin-analytics'],
    queryFn: () => Admin.getAnalytics(),
  });
}

export function useGetKnowledgebase() {
  return useQuery({
    queryKey: ['admin-knowledegbase'],
    queryFn: () => KnowledgeBase.getKnowledgebase(),
  });
}

export function useGetKnowledgebaseById(id: string) {
  return useQuery({
    queryKey: ['admin-knowledegbase'],
    queryFn: () => KnowledgeBase.getKnowledgebaseById(id),
  });
}

export function useGetQuery() {
  return useQuery({
    queryKey: ['admin-query'],
    queryFn: () => Query.getAllQuery(),
  });
}
