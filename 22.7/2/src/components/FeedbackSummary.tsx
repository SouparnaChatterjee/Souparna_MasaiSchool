import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';

const FeedbackSummary: React.FC = () => {
  const { feedbackData } = useFeedback();
  const navigate = useNavigate();

  const isValid =
    feedbackData.name && feedbackData.email && feedbackData.rating && feedbackData.feedback;

  if (!isValid) {
    return (
      <div>
        <h3>Invalid Access</h3>
        <p>Please fill the feedback form first.</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Feedback Summary</h2>
      <p><strong>Name:</strong> {feedbackData.name}</p>
      <p><strong>Email:</strong> {feedbackData.email}</p>
      <p><strong>Rating:</strong> {feedbackData.rating}</p>
      <p><strong>Feedback:</strong> {feedbackData.feedback}</p>
      <button onClick={() => navigate('/')}>Back to Form</button>
    </div>
  );
};

export default FeedbackSummary;
