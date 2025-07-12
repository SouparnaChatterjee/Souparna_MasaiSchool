import {
  ADD_BOOK, DELETE_BOOK, MARK_AS_READ, EDIT_BOOK
} from '../actions/bookActions';

const initialState = [];

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.payload];
    case DELETE_BOOK:
      return state.filter(book => book.id !== action.payload);
    case MARK_AS_READ:
      return state.map(book =>
        book.id === action.payload ? { ...book, isRead: true } : book
      );
    case EDIT_BOOK:
      return state.map(book =>
        book.id === action.payload.id ? { ...action.payload } : book
      );
    default:
      return state;
  }
};

export default bookReducer;
