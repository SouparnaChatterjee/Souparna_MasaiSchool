import { v4 as uuidv4 } from 'uuid';

export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const DELETE_TODO = "DELETE_TODO";

// Action Creators
export const addTodo = (title) => ({
  type: ADD_TODO,
  payload: {
    id: uuidv4(),
    title,
    status: false,
  }
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});
