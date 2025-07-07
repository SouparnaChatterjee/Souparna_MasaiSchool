import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));

    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategoryList(data));
  }, []);

  const getFilteredSortedProducts = () => {
    let filtered = filter ? products.filter(p => p.category === filter) : [...products];

    if (sort === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>Filter by Category: </label>
        <select onChange={(e) => setFilter(e.target.value)} defaultValue="">
          <option value="">All</option>
          {categoryList.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label style={{ marginLeft: '20px' }}>Sort by Price: </label>
        <select onChange={(e) => setSort(e.target.value)} defaultValue="">
          <option value="">None</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {getFilteredSortedProducts().map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
            <Link to={`/product/${product.id}`}>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
