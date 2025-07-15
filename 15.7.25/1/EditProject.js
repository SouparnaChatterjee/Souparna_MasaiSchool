import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjects, updateProject } from './firebaseService';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjects();
      const project = data[id];
      setTitle(project.title);
      setDescription(project.description);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProject(id, { title, description, createdAt: new Date().toISOString() });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Project</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProject;
