const productGrid = document.getElementById("productGrid");

// Fetching products from the FakeStoreAPI
fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {
    // Iterating over each product
    data.forEach(product => {
      // Create a container div
      const card = document.createElement("div");
      card.classList.add("card");

      // Conditional border color
      if (product.price > 50) {
        card.classList.add("yellow-border");
      } else {
        card.classList.add("green-border");
      }

      // Add inner HTML to card
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
      `;

      // Append the card to the grid
      productGrid.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching products:", error);
    productGrid.innerHTML = `<p style="color:red;">Failed to load products.</p>`;
  });
