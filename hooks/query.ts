import * as Admin from '@/data-access/admin';
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
    queryFn: () => Admin.getKnowledgebase(),
  });
}
export function useGetKnowledgebaseById(id: string) {
  return useQuery({
    queryKey: ['admin-knowledegbase'],
    queryFn: () => Admin.getKnowledgebaseById(id),
  });
}
