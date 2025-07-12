import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import movieReducer from './movieSlice';
import watchlistReducer from './watchlistSlice';
import bookingReducer from './bookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    watchlist: watchlistReducer,
    booking: bookingReducer,
  },
});

export default store;
