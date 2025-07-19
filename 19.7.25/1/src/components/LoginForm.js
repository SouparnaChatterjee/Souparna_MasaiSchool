import React from 'react';
import useForm from '../hooks/useForm';

const LoginForm = () => {
  const [form, handleChange, resetForm] = useForm({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in as ${form.email}`);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
