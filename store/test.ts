import { Question, submittedAnswer } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  standard: string | null;
  chapter: number | null;
  questions: Question[];
  submittedAnswers: submittedAnswer[];
  currentQuestion: number;
};

type Actions = {
  setStandard: (params: string) => void;
  setChapter: (params: number) => void;
  setQuestions: (params: Question[]) => void;
  setSubmittedAnswer: (params: submittedAnswer) => void;
  setCurrentQuestion: (params: number) => void;

  resetSubmittedAnswer: () => void;
  resetCurrentQuestion: () => void;
  resetQuestion: () => void;
};

const useTestStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      standard: null,
      chapter: null,
      questions: [],
      submittedAnswers: [],
      currentQuestion: 0,
      setCurrentQuestion: (questionNo) => set({ currentQuestion: questionNo }),
      setQuestions: (questions) => set({ questions: questions }),
      setStandard: (standard) => set({ standard: standard }),
      setChapter: (chapter) => set({ chapter: chapter }),
      setSubmittedAnswer: (answer) =>
        set({ submittedAnswers: [...get().submittedAnswers, answer] }),
      resetSubmittedAnswer: () => set({ submittedAnswers: [] }),
      resetCurrentQuestion: () => set({ currentQuestion: 0 }),
      resetQuestion: () => set({ questions: [] }),
    }),
    {
      name: 'test-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useTestStore;
