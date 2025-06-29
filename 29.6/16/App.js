import React, { useState } from "react";

// ProductCard Component
function ProductCard({ name, price, image, discount }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "15px",
      width: "250px",
      margin: "10px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <img src={image} alt={name} style={{ width: "100%", borderRadius: "10px" }} />
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
      {discount !== undefined && (
        <span style={{
          backgroundColor: "red",
          color: "white",
          padding: "5px",
          borderRadius: "5px",
          fontWeight: "bold"
        }}>
          {discount}% OFF
        </span>
      )}
    </div>
  );
}

// Main App Component
export default function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    discount: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Price must be a positive number.";
    if (!formData.image.startsWith("http"))
      newErrors.image = "Image URL must start with http.";
    if (
      formData.discount &&
      (isNaN(formData.discount) || formData.discount < 0 || formData.discount > 100)
    )
      newErrors.discount = "Discount must be between 0 and 100.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length === 0) {
      const newProduct = {
        name: formData.name,
        price: Number(formData.price),
        image: formData.image,
        discount: formData.discount ? Number(formData.discount) : undefined
      };
      setProducts([...products, newProduct]);
      setFormData({ name: "", price: "", image: "", discount: "" });
      setErrors({});
    } else {
      setErrors(validation);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <br />
        {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
        <br />
        <input
          type="text"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <br />
        {errors.price && <small style={{ color: "red" }}>{errors.price}</small>}
        <br />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <br />
        {errors.image && <small style={{ color: "red" }}>{errors.image}</small>}
        <br />
        <input
          type="text"
          placeholder="Discount (optional)"
          value={formData.discount}
          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
        />
        <br />
        {errors.discount && <small style={{ color: "red" }}>{errors.discount}</small>}
        <br /><br />
        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((prod, index) => (
          <ProductCard key={index} {...prod} />
        ))}
      </div>
    </div>
  );
}
