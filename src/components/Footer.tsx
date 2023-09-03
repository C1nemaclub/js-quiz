import { FC } from 'react';
import useQuestionsData from '../hooks/useQuestionsData';
import { Button } from '@mui/material';
import { useQuestionsStore } from '../store/questions';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const { correct, wrong, unanswered } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} Correct - ❌ ${wrong} Wrong - ❓ ${unanswered} Unanswered`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={reset} variant='outlined'>
          Reset Quiz
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
