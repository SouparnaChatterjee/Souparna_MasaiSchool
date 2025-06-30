import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    const trimmedTask = newTask.trim();
    if (trimmedTask === '') return; // ✅ Prevent adding empty tasks

    const taskObject = {
      id: Date.now(), // ✅ Unique identifier
      text: trimmedTask,
      completed: false,
    };
    setTasks([...tasks, taskObject]);
    setNewTask('');
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id); // ✅ Correct deletion by ID
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        placeholder="Enter a task..."
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              className={task.completed ? 'completed' : ''}
              onClick={() => handleToggleComplete(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
