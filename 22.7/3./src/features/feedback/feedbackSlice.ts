import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedbackEntry, FeedbackState } from './types';

const initialState: FeedbackState = {
  entries: [],
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addFeedback: (state, action: PayloadAction<FeedbackEntry>) => {
      state.entries.push(action.payload);
    },
  },
});

export const { addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
