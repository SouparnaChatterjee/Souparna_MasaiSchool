import { Feedback } from '../types/feedback';

const STORAGE_KEY = 'aromatic_feedback';

export const saveFeedback = (feedback: Feedback[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
};

export const loadFeedback = (): Feedback[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
