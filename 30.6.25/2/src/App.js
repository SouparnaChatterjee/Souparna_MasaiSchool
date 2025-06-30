import React, { useState } from 'react';
import './App.css';

const priorityOrder = { High: 3, Medium: 2, Low: 1 };

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const addTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      priority,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );

    setTasks(updatedTasks);
    setTitle('');
    setPriority('Medium');
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks
      .map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
      .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Completed' && task.completed) ||
      (statusFilter === 'Incomplete' && !task.completed);
    return matchesPriority && matchesStatus;
  });

  return (
    <div className="App">
      <h1>Advanced Task Manager</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filters">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`task ${task.completed ? 'completed' : ''} ${
              task.priority === 'High' ? 'high-priority' : ''
            }`}
          >
            <span onClick={() => toggleCompletion(task.id)}>
              {task.title} - <em>{task.priority}</em>
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

