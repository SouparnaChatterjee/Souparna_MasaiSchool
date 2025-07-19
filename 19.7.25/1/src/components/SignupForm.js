import React from 'react';
import useForm from '../hooks/useForm';

const SignupForm = () => {
  const [form, handleChange, resetForm] = useForm({ username: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Account created for ${form.username}`);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
