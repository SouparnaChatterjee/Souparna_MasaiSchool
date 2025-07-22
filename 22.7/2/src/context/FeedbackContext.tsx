import React, { createContext, useContext, useState, ReactNode } from 'react';

type FeedbackData = {
  name: string;
  email: string;
  rating: number;
  feedback: string;
};

type FeedbackContextType = {
  feedbackData: FeedbackData;
  setFeedbackData: React.Dispatch<React.SetStateAction<FeedbackData>>;
};

const initialData: FeedbackData = {
  name: '',
  email: '',
  rating: 0,
  feedback: '',
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [feedbackData, setFeedbackData] = useState<FeedbackData>(initialData);
  return (
    <FeedbackContext.Provider value={{ feedbackData, setFeedbackData }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("useFeedback must be used within FeedbackProvider");
  return context;
};
