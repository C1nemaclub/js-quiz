import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { Question } from '../types';
import confetti from 'canvas-confetti';
import { getAllQuestions } from '../services/questions';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,

          fetchQuestions: async (limit: number) => {
            const questions = await getAllQuestions();

            const sortedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, limit);
            set({ questions: sortedQuestions }, false, 'FETCH_QUESTIONS');
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

            set({ questions: newQuestions }, false, 'SELECT_ANSWER');
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get();

            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_ANSWER');
            }
          },
          goPrevQuestion: () => {
            const { currentQuestion } = get();

            const prevQuestion = currentQuestion - 1;

            if (prevQuestion >= 0) {
              set({ currentQuestion: prevQuestion }, false, 'GO_PREVIOUS_ANSWER');
            }
          },
          reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET');
          },
        };
      },
      {
        name: 'questions',
      }
    )
  )
);
