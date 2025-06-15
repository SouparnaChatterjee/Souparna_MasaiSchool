const products = [
  { id: 1, name: "Product A", price: 50, inStock: true },
  { id: 2, name: "Product B", price: 30, inStock: false },
  { id: 3, name: "Product C", price: 70, inStock: true },
  { id: 4, name: "Product D", price: 20, inStock: false }
];

const productGrid = document.getElementById("productGrid");

// Iterate over the product array
products.forEach(product => {
  // Create the card container
  const card = document.createElement("div");
  card.classList.add("card");

  // Apply conditional styling based on stock status
  if (product.inStock) {
    card.classList.add("in-stock");
  } else {
    card.classList.add("out-of-stock");
  }

  // Populate the card with product info
  card.innerHTML = `
    <h3>${product.name}</h3>
    <p>Price: $${product.price}</p>
    <p>Status: ${product.inStock ? "In Stock" : "Out of Stock"}</p>
  `;

  // Append the card to the grid
  productGrid.appendChild(card);
});
