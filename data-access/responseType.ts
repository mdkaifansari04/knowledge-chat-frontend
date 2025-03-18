import { User } from '@/store/app';

interface ApiResponse {
  success: boolean;
  message: string;
}

interface Category {
  name: string;
  userId: string;
  _id: string;
  __v: number;
}

export interface CreateCategoryResponse extends ApiResponse {
  category: Category;
}

export interface GetCategories extends ApiResponse {
  categories: Category[];
}

export interface CreateUserResponse extends ApiResponse {
  user: User;
  token: string;
}

export interface AIChatResponse extends ApiResponse {
  response: string;
}

export interface UserResponse extends ApiResponse {
  user: User;
}
