let currentUser = null;

function login() {
  const username = document.getElementById("usernameInput").value.trim();
  if (!username) {
    alert("Please enter a username.");
    return;
  }

  currentUser = username;
  document.getElementById("loginStatus").innerText = "Logged in as " + username;
  document.getElementById("currentUser").innerText = username;
  document.getElementById("cartSection").style.display = "block";
  loadCart();
}

function getAllCarts() {
  return JSON.parse(localStorage.getItem("multiCart")) || {};
}

function saveAllCarts(carts) {
  localStorage.setItem("multiCart", JSON.stringify(carts));
}

function loadCart() {
  const carts = getAllCarts();
  const cart = carts[currentUser] || [];
  renderCart(cart);
}

function addItem() {
  const itemName = document.getElementById("itemName").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!itemName || isNaN(price) || isNaN(quantity) || quantity <= 0 || price <= 0) {
    alert("Enter valid item details.");
    return;
  }

  const carts = getAllCarts();
  const userCart = carts[currentUser] || [];

  const existingItem = userCart.find(item => item.itemName === itemName);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    userCart.push({ itemName, price, quantity });
  }

  carts[currentUser] = userCart;
  saveAllCarts(carts);
  renderCart(userCart);
}

function renderCart(cart) {
  const tbody = document.getElementById("cartTable");
  tbody.innerHTML = "";
  let totalCost = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    const itemTotal = item.price * item.quantity;
    totalCost += itemTotal;

    row.innerHTML = `
      <td>${item.itemName}</td>
      <td>₹${item.price}</td>
      <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" /></td>
      <td>₹${itemTotal}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("totalCost").innerText = totalCost.toFixed(2);
}

function updateQuantity(index, newQty) {
  const quantity = parseInt(newQty);
  if (isNaN(quantity) || quantity <= 0) {
    alert("Invalid quantity");
    return;
  }

  const carts = getAllCarts();
  carts[currentUser][index].quantity = quantity;
  saveAllCarts(carts);
  renderCart(carts[currentUser]);
}

function removeItem(index) {
  const carts = getAllCarts();
  carts[currentUser].splice(index, 1);
  saveAllCarts(carts);
  renderCart(carts[currentUser]);
}
