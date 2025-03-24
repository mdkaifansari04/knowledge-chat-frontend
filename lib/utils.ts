import { Question } from '@/types';
import axios, { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserShortName(username: string | undefined) {
  if (!username) return;
  let firstLetter = username.split(' ')[0].slice(0, 1).toUpperCase();
  let secondLetter = username.split(' ')[1] ? username.split(' ')[1].slice(0, 1).toUpperCase() : 'A';
  return firstLetter + secondLetter;
}

export const capitalizeFirstLetter = (string: string | null) => {
  if (!string) return;

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getTitleAndDescription = (score: number, questions: Question[]) => {
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

export const getErrorMessage = (error: Error) => {
  const axiosError = error as AxiosError<{ message: string }>;
  return axiosError.response?.data?.message || 'Something went wrong, Please try again';
};

export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error('Invalid date');

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

export const isValidYouTubeUrl = (url: string): boolean => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  return regex.test(url);
};
