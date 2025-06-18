const API_BASE = "https://6852da1c0594059b23cf5c13.mockapi.io/products";

document.getElementById("searchBtn").addEventListener("click", async () => {
  const category = document.getElementById("category").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;
  const messageEl = document.getElementById("message");

  let url = `${API_BASE}?`;

  if (category) url += `category=${category}&`;
  if (minPrice) url += `min_price=${minPrice}&`;
  if (maxPrice) url += `max_price=${maxPrice}&`;
  url += `sort=asc`;

  try {
    messageEl.textContent = "Loading...";
    const res = await fetch(url);
    const products = await res.json();

    if (products.length === 0) {
      messageEl.textContent = "No products found.";
      renderProducts([]);
    } else {
      messageEl.textContent = "";
      renderProducts(products);
    }
  } catch (err) {
    messageEl.textContent = "Failed to fetch products. Try again.";
    console.error(err);
  }
});

function renderProducts(products) {
  const container = document.getElementById("productGrid");
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p><strong>${product.category}</strong></p>
    `;
    container.appendChild(card);
  });
}
