import React, { useEffect, useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const currentPageRef = useRef(1);
  const todosPerPage = 10;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const totalPages = Math.ceil(todos.length / todosPerPage);

  const handlePageChange = (pageNum) => {
    currentPageRef.current = pageNum;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextPage = () => {
    if (currentPageRef.current < totalPages) {
      currentPageRef.current += 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPageRef.current > 1) {
      currentPageRef.current -= 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const indexOfLast = currentPageRef.current * todosPerPage;
  const indexOfFirst = indexOfLast - todosPerPage;
  const currentTodos = todos.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container">
      <h2>Todos</h2>
      <ul className="todo-list">
        {currentTodos.map((todo) => (
          <li key={todo.id}>
            #{todo.id}. {todo.title}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPageRef.current === 1}>
          Previous
        </button>
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
        <button
          onClick={nextPage}
          disabled={currentPageRef.current === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
