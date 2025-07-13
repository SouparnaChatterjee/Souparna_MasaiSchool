import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./actionTypes";

const initialState = {
  isAuth: false,
  token: '',
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, token: action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, isAuth: false, token: '', error: action.payload };
    default:
      return state;
  }
};
