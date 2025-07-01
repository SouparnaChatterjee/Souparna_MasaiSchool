import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  const fetchMemes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("https://api.imgflip.com/get_memes");
      setMemes(res.data.data.memes);
      setFilteredMemes(res.data.data.memes);
    } catch (err) {
      setError("Failed to load memes. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const applyFilters = () => {
    let data = [...memes];

    if (searchTerm) {
      data = data.filter((meme) =>
        meme.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy === "width") {
      data = data.filter((meme) => meme.width > 500);
    } else if (filterBy === "height") {
      data = data.filter((meme) => meme.height > 500);
    }

    if (sortBy === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "width") {
      data.sort((a, b) => b.width - a.width);
    }

    setFilteredMemes(data);
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line
  }, [searchTerm, sortBy, filterBy]);

  const resetAll = () => {
    setSearchTerm("");
    setSortBy("");
    setFilterBy("");
    setFilteredMemes(memes);
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Meme Explorer</h1>
        <button onClick={handleThemeToggle}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>

      <div className="controls">
        <button onClick={fetchMemes}>Load Memes</button>
        <button onClick={resetAll}>Reset</button>

        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="width">Width</option>
        </select>

        <select onChange={(e) => setFilterBy(e.target.value)} value={filterBy}>
          <option value="">Filter By</option>
          <option value="width">Width > 500</option>
          <option value="height">Height > 500</option>
        </select>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && filteredMemes.length === 0 && !error && (
        <p>No memes found.</p>
      )}

      <div className="grid">
        {filteredMemes.map((meme) => (
          <div className="card" key={meme.id}>
            <img src={meme.url} alt={meme.name} />
            <h4>{meme.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
