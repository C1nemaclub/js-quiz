import './App.css';
import { Container, Stack, Typography } from '@mui/material';
import { JavascriptLogo } from './JavascriptLogo';
import Start from './components/Start';
import { useQuestionsStore } from './store/questions';
import Game from './components/Game';

function App() {
  const questions = useQuestionsStore((state) => state.questions);

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} justifyContent='center' alignItems='center'>
          <JavascriptLogo />
          <Typography variant='h2' component='h1'>
            Javascript Quizz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
