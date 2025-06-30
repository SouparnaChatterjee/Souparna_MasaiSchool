import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(["Buy milk", "Study React"]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <div className="input-area">
        <input 
          type="text" 
          value={input} 
          placeholder="Enter task..." 
          onChange={(e) => setInput(e.target.value)} 
        />
        <button onClick={handleAddTask}>Add Task</button>
        <button onClick={handleClearAll}>Clear All</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-msg">No tasks available.</p>
        ) : (
          tasks.map((task, index) => <li key={index}>{task}</li>)
        )}
      </ul>
    </div>
  );
}

export default App;
