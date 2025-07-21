import React from 'react';
import { Feedback } from '../types/feedback';

const FeedbackRow: React.FC<{ feedback: Feedback }> = ({ feedback }) => (
  <tr>
    <td>{feedback.name}</td>
    <td>{feedback.email}</td>
    <td>{feedback.visitDate}</td>
    <td>{feedback.rating}</td>
    <td>{feedback.comments}</td>
  </tr>
);

export default FeedbackRow;
