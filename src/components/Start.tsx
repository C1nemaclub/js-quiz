import { Button } from '@mui/material';
import { FC } from 'react';
import { useQuestionsStore } from '../store/questions';

const QUESTIONS_LIMIT = 10;

interface StartProps {}

const Start: FC<StartProps> = ({}) => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(QUESTIONS_LIMIT);
  };

  return (
    <Button variant='contained' onClick={handleClick} sx={{ marginTop: '16px' }}>
      Start !
    </Button>
  );
};

export default Start;
