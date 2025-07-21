import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map(task => (
        <li
          key={task.id}
          style={{
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            backgroundColor: task.completed ? '#e6ffe6' : '#fff'
          }}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            style={{ marginRight: '10px' }}
          />
          <strong>{task.description}</strong> — <em>{task.priority}</em>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
