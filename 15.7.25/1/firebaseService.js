import axios from 'axios';

const BASE_URL = 'https://souparna1-ae0ae-default-rtdb.firebaseio.com';

export const getProjects = async () => {
  const res = await axios.get(`${BASE_URL}/projects.json`);
  return res.data;
};

export const addProject = async (project) => {
  await axios.post(`${BASE_URL}/projects.json`, project);
};

export const updateProject = async (id, data) => {
  await axios.put(`${BASE_URL}/projects/${id}.json`, data);
};

export const deleteProject = async (id) => {
  await axios.delete(`${BASE_URL}/projects/${id}.json`);
};

export const addTask = async (projectId, task) => {
  await axios.post(`${BASE_URL}/projects/${projectId}/tasks.json`, task);
};

export const updateTask = async (projectId, taskId, task) => {
  await axios.put(`${BASE_URL}/projects/${projectId}/tasks/${taskId}.json`, task);
};

export const deleteTask = async (projectId, taskId) => {
  await axios.delete(`${BASE_URL}/projects/${projectId}/tasks/${taskId}.json`);
};
