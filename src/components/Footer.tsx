import { FC } from 'react';
import useQuestionsData from '../hooks/useQuestionsData';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const { correct, wrong, unanswered } = useQuestionsData();

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} Correct - ❌ ${wrong} Wrong - ❓ ${unanswered} Unanswered`}</strong>
    </footer>
  );
};

export default Footer;
