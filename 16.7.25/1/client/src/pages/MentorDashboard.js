import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MentorDashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/entries/student123') // Replace dynamically
      .then(res => setEntries(res.data));
  }, []);

  return (
    <div>
      <h2>Mentor Dashboard</h2>
      {entries.map((e, i) => (
        <div key={i}>
          <h4>{e.date}</h4>
          <p>Reflection: {e.reflection}</p>
        </div>
      ))}
    </div>
  );
}

export default MentorDashboard;
