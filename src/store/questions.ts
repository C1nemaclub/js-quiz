import { create } from 'zustand';
import { Question } from '../types';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
}

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json').then((res) => res.json());

      const questions = res.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions });
    },
  };
});
