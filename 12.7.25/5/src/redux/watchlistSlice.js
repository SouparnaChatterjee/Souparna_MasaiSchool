
import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: [],
  reducers: {
    addToWatchlist: (state, action) => {
      const exists = state.find(movie => movie.id === action.payload.id);
      if (!exists) state.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      return state.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
