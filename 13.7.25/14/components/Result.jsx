import React from 'react';
import { useSelector } from 'react-redux';
import { Heading, Box } from '@chakra-ui/react';

const Result = () => {
  const { score, questions } = useSelector(state => state.quiz);
  return (
    <Box textAlign="center" mt={20}>
      <Heading>Your Score</Heading>
      <Heading size="lg">{score} / {questions.length}</Heading>
    </Box>
  );
};

export default Result;
