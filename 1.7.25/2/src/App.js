import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to load products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const clearProducts = () => {
    setProducts([]);
    setError("");
  };

  return (
    <div className="container">
      <h1>Product Store</h1>
      <div className="buttons">
        <button onClick={loadProducts}>Load Products</button>
        <button onClick={clearProducts} disabled={products.length === 0}>
          Clear Products
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && products.length === 0 && !error && (
        <p>No products to display.</p>
      )}

      <div className="grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
