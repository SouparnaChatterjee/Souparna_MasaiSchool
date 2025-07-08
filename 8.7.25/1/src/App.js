import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const currentPageRef = useRef(1);
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await res.json();
      setCharacters(data.results.slice(0, 10)); // 10 per page
      setTotalPages(data.info.pages);
    } catch (err) {
      console.error("Error fetching:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters(currentPageRef.current);
  }, []);

  const handlePageChange = (page) => {
    currentPageRef.current = page;
    fetchCharacters(page);
  };

  return (
    <div className="container">
      <h1>Rick and Morty Characters</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {characters.map((char) => (
            <div className="card" key={char.id}>
              <img src={char.image} alt={char.name} />
              <p>{char.name}</p>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={currentPageRef.current === pageNum ? "active" : ""}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
