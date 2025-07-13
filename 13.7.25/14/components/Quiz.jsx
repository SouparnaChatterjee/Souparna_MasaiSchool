import React, { useEffect } from 'react';
import {
  Box, Button, Heading, Text, VStack, Spinner
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_FAILURE,
  INCREMENT_SCORE,
  NEXT_QUESTION
} from '../redux/actionTypes';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestion, score, isLoading } = useSelector(state => state.quiz);

  useEffect(() => {
    dispatch({ type: FETCH_QUIZ_REQUEST });
    axios.get("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-quiz")
      .then(res => {
        dispatch({ type: FETCH_QUIZ_SUCCESS, payload: res.data.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_QUIZ_FAILURE, payload: err.message });
      });
  }, [dispatch]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      dispatch({ type: INCREMENT_SCORE });
    }
    goNext();
  };

  const goNext = () => {
    if (currentQuestion + 1 < questions.length) {
      dispatch({ type: NEXT_QUESTION });
    } else {
      navigate("/result");
    }
  };

  if (isLoading) return <Spinner size="xl" mt={10} />;

  const q = questions[currentQuestion];
  return (
    <VStack spacing={6} mt={10}>
      <Heading>Quiz</Heading>
      {q && (
        <Box border="1px solid teal" p={6} w="400px" borderRadius="md">
          <Text fontSize="xl">{q.question}</Text>
          {q.options.map((opt, i) => (
            <Button key={i} w="100%" mt={2} onClick={() => handleAnswer(opt === q.correct_option)}>
              {opt}
            </Button>
          ))}
          <Button variant="outline" mt={4} onClick={goNext}>Skip</Button>
        </Box>
      )}
    </VStack>
  );
};

export default Quiz;
