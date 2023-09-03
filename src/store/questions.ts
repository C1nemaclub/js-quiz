import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question } from '../types';
import confetti from 'canvas-confetti';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
          const res = await fetch('/data.json').then((res) => res.json());

          const questions = res.sort(() => Math.random() - 0.5).slice(0, limit);
          set({ questions });
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();
          const newQuestions = structuredClone(questions);

          const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
          const questionInfo = newQuestions[questionIndex];

          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
          if (isCorrectUserAnswer) confetti();

          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };

          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();

          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },
        goPrevQuestion: () => {
          const { currentQuestion } = get();

          const prevQuestion = currentQuestion - 1;

          if (prevQuestion >= 0) {
            set({ currentQuestion: prevQuestion });
          }
        },
      };
    },
    {
      name: 'questions',
    }
  )
);
