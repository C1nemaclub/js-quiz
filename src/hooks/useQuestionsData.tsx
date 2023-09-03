import { useQuestionsStore } from '../store/questions';

const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions);

  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else wrong++;
  });

  return { correct, wrong, unanswered };
};

export default useQuestionsData;
