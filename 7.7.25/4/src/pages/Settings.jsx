import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Settings = () => {
  const { user, updateUser } = useContext(UserContext);
  const [form, setForm] = useState({ name: user.name, email: user.email });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(form);
    alert("User data updated!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label><br />
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email: </label><br />
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Update</button>
      </form>
    </div>
  );
};

export default Settings;
