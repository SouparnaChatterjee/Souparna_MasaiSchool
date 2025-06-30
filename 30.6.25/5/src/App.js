import React, { useState } from 'react';
import './App.css';

const initialStudents = [
  { id: 1, name: "Alice", present: true },
  { id: 2, name: "Bob", present: false },
  { id: 3, name: "Charlie", present: true },
  { id: 4, name: "David", present: false },
  { id: 5, name: "Eva", present: true },
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState("All");

  const toggleAttendance = (id) => {
    const updated = students.map(student =>
      student.id === id ? { ...student, present: !student.present } : student
    );
    setStudents(updated);
  };

  const getFilteredStudents = () => {
    if (filter === "Present") return students.filter(s => s.present);
    if (filter === "Absent") return students.filter(s => !s.present);
    return students;
  };

  const presentCount = students.filter(s => s.present).length;

  return (
    <div className="App">
      <h1>Attendance Manager</h1>

      <div className="filter">
        <label>Filter:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <div className="student-list">
        {getFilteredStudents().map((student) => (
          <div
            key={student.id}
            className={`student ${student.present ? 'present' : 'absent'}`}
          >
            <span>{student.name}</span>
            <span>{student.present ? "Present" : "Absent"}</span>
            <button onClick={() => toggleAttendance(student.id)}>Toggle</button>
          </div>
        ))}
      </div>

      <div className="summary">
        Total Present: {presentCount}
      </div>
    </div>
  );
}

export default App;
