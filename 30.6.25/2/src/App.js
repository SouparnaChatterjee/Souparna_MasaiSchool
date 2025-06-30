import React, { useState } from 'react';
import './App.css';

const priorityOrder = { High: 3, Medium: 2, Low: 1 };

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const
