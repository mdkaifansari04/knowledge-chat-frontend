import * as Admin from '@/data-access/admin';
import { useQuery } from '@tanstack/react-query';

export function useGetAlalytics() {
  return useQuery({
    queryKey: ['admin-analytics'],
    queryFn: () => Admin.getAnalytics(),
  });
}
