import React, { useState } from 'react';
import { Priority, Task } from '../types';

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<Priority>(Priority.Medium);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      description,
      priority,
      completed: false
    };

    onAdd(newTask);
    setDescription('');
    setPriority(Priority.Medium);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Task description"
        required
      />
      <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
        <option value={Priority.Low}>Low</option>
        <option value={Priority.Medium}>Medium</option>
        <option value={Priority.High}>High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
