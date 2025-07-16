import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function Tracker() {
  const [form, setForm] = useState({
    userId: 'student123',
    date: new Date().toISOString().slice(0, 10),
    studyHours: 0,
    breakTime: 0,
    sleepHours: 0,
    stressLevel: 0,
    focusLevel: 0,
    reflection: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitEntry = async () => {
    await axios.post('http://localhost:5000/api/entries', form);
    alert('Entry logged!');
  };

  return (
    <div>
      <input type="date" name="date" value={form.date} onChange={handleChange} />
      <input name="studyHours" placeholder="Study Hours" type="number" onChange={handleChange} />
      <input name="breakTime" placeholder="Break Time" type="number" onChange={handleChange} />
      <input name="sleepHours" placeholder="Sleep Hours" type="number" onChange={handleChange} />
      <input name="stressLevel" placeholder="Stress Level" type="number" onChange={handleChange} />
      <input name="focusLevel" placeholder="Focus Level" type="number" onChange={handleChange} />
      <textarea name="reflection" placeholder="Reflection (Markdown supported)" onChange={handleChange} />
      <ReactMarkdown>{form.reflection}</ReactMarkdown>
      <button onClick={submitEntry}>Submit</button>
    </div>
  );
}

export default Tracker;
