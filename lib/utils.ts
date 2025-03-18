import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LOCAL_STORAGE_KEY } from './constant';
import { Question } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserShortName(username: string | undefined) {
  if (!username) return;
  let firstLetter = username.split(' ')[0].slice(0, 1).toUpperCase();
  let secondLetter = username.split(' ')[1]
    ? username.split(' ')[1].slice(0, 1).toUpperCase()
    : 'A';
  return firstLetter + secondLetter;
}

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

export const capitalizeFirstLetter = (string: string | null) => {
  if (!string) return;

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getTitleAndDescription = (
  score: number,
  questions: Question[],
) => {
  let title = `${score} / ${questions.length}`;
  let description = '';

  if (score === questions.length) {
    description = 'Congratulations! You got a perfect score!';
  } else if (score > questions.length / 2) {
    description = 'Good job! You scored well.';
  } else {
    description = 'Keep trying! You can improve your score.';
  }

  return { title, description };
};
