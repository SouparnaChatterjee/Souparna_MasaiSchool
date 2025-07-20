import React from 'react';
import useForm from '../hooks/useForm';

const SignupForm = () => {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', values);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Signup Form</h2>
      <input
        name="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <input
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <button type="submit" style={{ padding: 10, width: '100%' }}>
        Submit
      </button>
    </form>
  );
};

export default SignupForm;
