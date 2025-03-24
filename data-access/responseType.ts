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

interface Resource {
  _id: string;
  name: string;
  resourceType: 'pdf' | 'ytVideo' | 'text' | 'audio' | 'video';
  resource: string;
}

export interface KnowledgeBase {
  _id: string;
  name: string;
  dimension: number;
  metric: string;
  host: string;
  resources: Resource[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
}
