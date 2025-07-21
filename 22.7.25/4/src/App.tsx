import React, { useEffect, useState } from 'react';
import './App.css';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import { Feedback } from './types/feedback';
import { saveFeedback, loadFeedback } from './utils/storage';

const App: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    setFeedbacks(loadFeedback());
  }, []);

  const handleAddFeedback = (fb: Feedback) => {
    const updated = [fb, ...feedbacks];
    setFeedbacks(updated);
    saveFeedback(updated);
  };

  return (
    <div className="App">
      <h1>Aromatic Bar Feedback System</h1>
      <FeedbackForm onAdd={handleAddFeedback} />
      <FeedbackList data={feedbacks} />
    </div>
  );
};

export default App;
