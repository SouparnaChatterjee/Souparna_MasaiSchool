import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';

const FeedbackForm: React.FC = () => {
  const { feedbackData, setFeedbackData } = useFeedback();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, rating, feedback } = feedbackData;

    if (!name || !email || !rating || !feedback) {
      setError('All fields are required.');
      return;
    }

    setError('');
    navigate('/summary');
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Feedback Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input type="text" name="name" value={feedbackData.name} onChange={handleChange} />

        <label>Email:</label><br />
        <input type="email" name="email" value={feedbackData.email} onChange={handleChange} />

        <label>Rating (1–5):</label><br />
        <input type="number" name="rating" value={feedbackData.rating || ''} onChange={handleChange} min="1" max="5" />

        <label>Feedback:</label><br />
        <textarea name="feedback" value={feedbackData.feedback} onChange={handleChange}></textarea>

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
