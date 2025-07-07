import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{product.title}</h2>
      <p>₹{product.price}</p>
      <p>{product.description}</p>
      <p><b>Category:</b> {product.category}</p>
      <img src={product.thumbnail} alt={product.title} width="200" />
    </div>
  );
};

export default ProductDetails;
