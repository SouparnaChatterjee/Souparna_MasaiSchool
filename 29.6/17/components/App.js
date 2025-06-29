import React, { useState } from "react";
import UserList from "./components/UserList";

export default function App() {
  const [users, setUsers] = useState([
    { name: "Riya Sen", email: "riya@example.com", age: 22 },
    { name: "Arjun Mehta", email: "arjun@example.com", age: 27 }
  ]);

  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) newErrors.email = "Email is invalid.";
    if (!form.age || isNaN(form.age) || parseInt(form.age) <= 0)
      newErrors.age = "Age must be a positive number.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length === 0) {
      const newUser = {
        name: form.name,
        email: form.email,
        age: parseInt(form.age)
      };
      setUsers((prev) => [...prev, newUser]);
      setForm({ name: "", email: "", age: "" });
      setErrors({});
    } else {
      setErrors(validation);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>User Management</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
        {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
        <br />
        <input
          type="text"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br />
        {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        <br />
        <input
          type="text"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <br />
        {errors.age && <small style={{ color: "red" }}>{errors.age}</small>}
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>Add User</button>
      </form>

      <h2>User List</h2>
      <UserList users={users} />
    </div>
  );
}
