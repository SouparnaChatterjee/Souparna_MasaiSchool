import React, { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const data = await response.json();
      console.log("Fetched Products:", data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Something went wrong while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Product Fetcher</h1>
      <button onClick={fetchProducts}>Fetch Products</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
