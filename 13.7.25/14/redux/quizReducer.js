import {
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_FAILURE,
  INCREMENT_SCORE,
  NEXT_QUESTION
} from "./actionTypes";

const initialState = {
  isLoading: false,
  questions: [],
  currentQuestion: 0,
  score: 0,
  error: null
};

export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZ_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_QUIZ_SUCCESS:
      return { ...state, isLoading: false, questions: action.payload };
    case FETCH_QUIZ_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case INCREMENT_SCORE:
      return { ...state, score: state.score + 1 };
    case NEXT_QUESTION:
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    default:
      return state;
  }
};
