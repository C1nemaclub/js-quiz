import './App.css';
import { Container, Stack, Typography } from '@mui/material';
import { JavascriptLogo } from './JavascriptLogo';

function App() {
  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} justifyContent='center' alignItems='center'>
          <JavascriptLogo />
          <Typography variant='h2' component='h1'>
            Javascript Quizz
          </Typography>
        </Stack>
      </Container>
    </main>
  );
}

export default App;
