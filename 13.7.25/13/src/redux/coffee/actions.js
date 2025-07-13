import axios from "axios";
import {
  GET_COFFEE_LOADING,
  GET_COFFEE_SUCCESS,
  GET_COFFEE_ERROR,
} from "./actionTypes";

export const getCoffee = (sortBy = "") => async (dispatch) => {
  dispatch({ type: GET_COFFEE_LOADING });
  try {
    const response = await axios.get(
      `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee${sortBy ? `?sort=price&order=${sortBy}` : ""}`
    );
    dispatch({ type: GET_COFFEE_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: GET_COFFEE_ERROR });
  }
};
