import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProject } from './firebaseService';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = {
      title,
      description,
      createdAt: new Date().toISOString(),
      tasks: {}
    };
    await addProject(project);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Project</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddProject;
