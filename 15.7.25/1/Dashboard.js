import React, { useEffect, useState } from 'react';
import { getProjects, deleteProject } from './firebaseService';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjects();
      setProjects(data || {});
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteProject(id);
    const updated = { ...projects };
    delete updated[id];
    setProjects(updated);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/add">Add Project</Link>
      <ul>
        {Object.entries(projects).map(([id, project]) => (
          <li key={id}>
            <Link to={`/project/${id}`}>{project.title}</Link>
            <button onClick={() => handleDelete(id)}>Delete</button>
            <Link to={`/edit/${id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
