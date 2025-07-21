import React, { useState } from 'react';
import { Feedback } from '../types/feedback';
import FeedbackRow from './FeedbackRow';

interface Props {
  data: Feedback[];
}

const FeedbackList: React.FC<Props> = ({ data }) => {
  const [filter, setFilter] = useState('');

  const filtered = data.filter(f =>
    f.name.toLowerCase().includes(filter.toLowerCase()) ||
    f.comments.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input placeholder="Filter..." value={filter} onChange={e => setFilter(e.target.value)} />
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Visit</th><th>Rating</th><th>Comments</th></tr>
        </thead>
        <tbody>
          {filtered.map(f => <FeedbackRow key={f.id} feedback={f} />)}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
