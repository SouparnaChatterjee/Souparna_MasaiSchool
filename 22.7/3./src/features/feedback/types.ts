export type FeedbackEntry = {
  id: string;
  name: string;
  email: string;
  rating: number;
  feedback: string;
  date: string;
};

export type FeedbackState = {
  entries: FeedbackEntry[];
};
