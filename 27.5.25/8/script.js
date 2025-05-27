const productContainer = document.getElementById("product-container");
const errorDiv = document.getElementById("error");
const totalPriceDisplay = document.getElementById("total-price");

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const products = await response.json();

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p><strong>Price:</strong> $${product.price}</p>
        <button>View Details</button>
      `;

      productContainer.appendChild(card);
    });

    const totalPrice = products.reduce((sum, item) => sum + item.price, 0);
    totalPriceDisplay.textContent = `Total Price of All Products: $${totalPrice.toFixed(2)}`;

  } catch (error) {
    errorDiv.textContent = "Failed to fetch products. Please try again later.";
    console.error("Fetch error:", error);
  }
}

fetchProducts();
