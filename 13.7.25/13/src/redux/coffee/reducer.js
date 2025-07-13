import {
  GET_COFFEE_LOADING,
  GET_COFFEE_SUCCESS,
  GET_COFFEE_ERROR,
} from "./actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export const coffeeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COFFEE_LOADING:
      return { ...state, loading: true, error: false };
    case GET_COFFEE_SUCCESS:
      return { ...state, loading: false, data: payload };
    case GET_COFFEE_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
