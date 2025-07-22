import React, { useState } from 'react';

type FeedbackData = {
  name: string;
  email: string;
  rating: number;
  feedback: string;
};

const initialFormState: FeedbackData = {
  name: '',
  email: '',
  rating: 0,
  feedback: '',
};

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackData>(initialFormState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, rating, feedback } = formData;

    if (!name || !email || !rating || !feedback) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');
    setSubmitted(true);
    setFormData(initialFormState);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Customer Feedback Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Rating (1 to 5):</label><br />
          <input type="number" name="rating" min="1" max="5" value={formData.rating || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Feedback:</label><br />
          <textarea name="feedback" value={formData.feedback} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h3>Thank you for your feedback!</h3>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
