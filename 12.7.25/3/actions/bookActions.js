import { v4 as uuidv4 } from 'uuid';

export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const MARK_AS_READ = 'MARK_AS_READ';
export const EDIT_BOOK = 'EDIT_BOOK';
export const SET_FILTER = 'SET_FILTER';

export const addBook = (book) => ({
  type: ADD_BOOK,
  payload: { ...book, id: uuidv4(), isRead: false }
});

export const deleteBook = (id) => ({
  type: DELETE_BOOK,
  payload: id
});

export const markAsRead = (id) => ({
  type: MARK_AS_READ,
  payload: id
});

export const editBook = (book) => ({
  type: EDIT_BOOK,
  payload: book
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});
