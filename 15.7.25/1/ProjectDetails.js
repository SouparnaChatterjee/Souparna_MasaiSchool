import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjects, addTask, updateTask, deleteTask } from './firebaseService';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjects();
      setProject(data[id]);
      setTasks(data[id]?.tasks || {});
    };
    fetchProject();
  }, [id]);

  const handleAddTask = async () => {
    const task = {
      title: taskTitle,
      completed: false,
      priority: 'low',
      createdAt: new Date().toISOString()
    };
    await addTask(id, task);
    setTaskTitle('');
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(id, taskId);
    const updated = { ...tasks };
    delete updated[taskId];
    setTasks(updated);
  };

  return project ? (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <h3>Tasks</h3>
      <input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Task title"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {Object.entries(tasks).map(([taskId, task]) => (
          <li key={taskId}>
            {task.title} ({task.priority})
            <button onClick={() => handleDeleteTask(taskId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  ) : <p>Loading...</p>;
};

export default ProjectDetails;
