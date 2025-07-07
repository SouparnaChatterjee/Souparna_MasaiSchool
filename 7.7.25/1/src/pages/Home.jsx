// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setFilteredPosts(data.posts);
      });
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Blog Posts</h1>
      <input
        type='text'
        placeholder='Search by title...'
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '20px', padding: '5px' }}
      />
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
