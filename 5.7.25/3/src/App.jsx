import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
      setFiltered(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const searchFiltered = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(searchFiltered);
  }, [search, users]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>User Profiles</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
      />

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {filtered.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          email={user.email}
          city={user.address.city}
        />
      ))}

      {!loading && !error && filtered.length === 0 && (
        <p>No users found for "{search}"</p>
      )}
    </div>
  );
};

export default App;
