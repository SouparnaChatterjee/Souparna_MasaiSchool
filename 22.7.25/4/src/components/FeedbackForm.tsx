import React, { useState } from 'react';
import { Feedback, Rating } from '../types/feedback';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  onAdd: (fb: Feedback) => void;
}

const FeedbackForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    visitDate: '',
    rating: Rating.Good,
    comments: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: Feedback = {
      id: uuidv4(),
      ...form,
      rating: Number(form.rating) as Rating,
    };
    onAdd(newFeedback);
    setSubmitted(true);
    setForm({ name: '', email: '', visitDate: '', rating: Rating.Good, comments: '' });
  };

  return submitted ? (
    <h3>🎉 Thank you for your feedback!</h3>
  ) : (
    <form onSubmit={handleSubmit}>
      <input name="name" required value={form.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="Email" />
      <input type="date" name="visitDate" required value={form.visitDate} onChange={handleChange} />
      <select name="rating" value={form.rating} onChange={handleChange}>
        {Object.entries(Rating).filter(([k]) => isNaN(Number(k))).map(([k, v]) => (
          <option key={k} value={v}>{k}</option>
        ))}
      </select>
      <textarea name="comments" placeholder="Comments..." value={form.comments} onChange={handleChange}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
