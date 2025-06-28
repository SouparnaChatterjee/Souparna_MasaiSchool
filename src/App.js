import React, { useState } from "react";

function App() {
  // Track current page with state
  const [page, setPage] = useState("Home");

  // Define styles for each page
  const pageStyles = {
    Home: { backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "2rem" },
    About: { backgroundColor: "#ffe4e1", minHeight: "100vh", padding: "2rem" },
    Contact: { backgroundColor: "#e6ffe6", minHeight: "100vh", padding: "2rem" },
  };

  // Define button styling
  const navButton = {
    padding: "10px 20px",
    margin: "0 10px",
    cursor: "pointer",
    border: "1px solid #000",
    borderRadius: "4px",
    backgroundColor: "#fff",
  };

  // Render content based on the current page
  const renderContent = () => {
    if (page === "Home") return <h1>Welcome to Home</h1>;
    if (page === "About") return <h1>About Us</h1>;
    if (page === "Contact") return <h1>Contact Us</h1>;
  };

  return (
    <div style={pageStyles[page]}>
      <nav>
        <button style={navButton} onClick={() => setPage("Home")}>Home</button>
        <button style={navButton} onClick={() => setPage("About")}>About</button>
        <button style={navButton} onClick={() => setPage("Contact")}>Contact</button>
      </nav>
      <hr />
      {renderContent()}
    </div>
  );
}

export default App;
