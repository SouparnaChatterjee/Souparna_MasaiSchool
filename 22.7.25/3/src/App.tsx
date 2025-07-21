import React, { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';

type Filter = 'all' | 'completed' | 'incomplete';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <TaskForm onAdd={addTask} />

      <div style={{ marginBottom: '15px' }}>
        <label>Filter:</label>{' '}
        <select value={filter} onChange={e => setFilter(e.target.value as Filter)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <TaskList tasks={filteredTasks} onToggle={toggleTaskCompletion} />
    </div>
  );
};

export default App;
