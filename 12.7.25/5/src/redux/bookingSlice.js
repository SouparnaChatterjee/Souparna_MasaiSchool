
import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
  },
  reducers: {
    bookMovie: (state, action) => {
      state.bookings.push(action.payload); // payload = { id, name, time, seat, etc. }
    },
    cancelBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
  },
});

export const { bookMovie, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
