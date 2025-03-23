export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface AdminLoginResponse {
  token: string;
}

export interface Analytics {
  usersCount: number;
  queries: Array<{
    timestamp: string;
    id: string;
  }>;
  totalStorageUsed: string;
  indexes: {
    name: string;
    totalVectors: number;
    dimension: number;
    namespaces: {
      [key: string]: {
        recordCount: number;
      };
    };
    storageUsed: string;
  }[];
}
