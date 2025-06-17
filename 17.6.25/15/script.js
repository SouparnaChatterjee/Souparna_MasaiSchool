const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortOrder = document.getElementById("sortOrder");
const productCount = document.getElementById("productCount");

let allProducts = [];

// Fetch all products on load
window.addEventListener("DOMContentLoaded", async () => {
  await fetchProducts();
  await fetchCategories();
  renderProducts(allProducts);
});

// Fetch product data
async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    allProducts = await res.json();
  } catch (err) {
    productGrid.innerHTML = `<p style="color: red;">${err.message}</p>`;
  }
}

// Fetch categories
async function fetchCategories() {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      categoryFilter.appendChild(option);
    });
  } catch (err) {
    console.error("Failed to fetch categories", err);
  }
}

// Render products
function renderProducts(products) {
  productGrid.innerHTML = "";
  productCount.textContent = `Showing ${products.length} product(s)`;
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>Price: $${p.price}</p>
    `;
    productGrid.appendChild(div);
  });
}

// Filter, Search & Sort handler
function applyFilters() {
  let filtered = [...allProducts];

  // Filter by category
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  // Search
  const keyword = searchInput.value.toLowerCase();
  if (keyword) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(keyword));
  }

  // Sort
  if (sortOrder.value === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

// Add event listeners
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortOrder.addEventListener("change", applyFilters);
