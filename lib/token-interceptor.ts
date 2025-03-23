'use client';
import { AxiosRequestConfig } from 'axios';
import { LOCAL_STORAGE_KEY } from './constant';

class TokenStorage {
  public storageKey: string;

  constructor(key: string) {
    this.storageKey = key;
  }

  set(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  get() {
    return localStorage.getItem(this.storageKey);
  }

  delete() {
    localStorage.removeItem(this.storageKey);
  }
}

export const accessTokenStorage = new TokenStorage(LOCAL_STORAGE_KEY);

export const tokenInterceptor = (config: AxiosRequestConfig) => {
  const token = accessTokenStorage.get();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
};
