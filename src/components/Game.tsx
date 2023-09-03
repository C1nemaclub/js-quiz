import { FC } from 'react';
import { Card, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useQuestionsStore } from '../store/questions';
import SyntaxHightlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import Question from '../types/Question';
import Footer from './Footer';

interface GameProps {}

const getBackgroundColor = (info: Question, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  if (userSelectedAnswer == null) return 'transparent';
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
  if (index === correctAnswer) return 'green';
  if (index === userSelectedAnswer) return 'red';

  return 'transparent';
};

const Question = ({ info }: { info: Question }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card variant='outlined' sx={{ textAlign: 'left', bgcolor: '#222', p: 2, marginTop: 4 }}>
      <Typography variant='h5'>{info.question}</Typography>

      <SyntaxHightlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHightlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => {
          return (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={info.userSelectedAnswer != null}
                onClick={createHandleClick(index)}
                sx={{ backgroundColor: getBackgroundColor(info, index) }}>
                <ListItemText primary={answer} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

const Game: FC<GameProps> = ({}) => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion);
  console.log(questions);

  const questionsInfo = questions[currentQuestion];

  return (
    <>
      <Stack direction='row' gap={2} alignContent='center' justifyContent='center'>
        <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionsInfo} />
      <Footer />
    </>
  );
};

export default Game;
