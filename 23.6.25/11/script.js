const API_URL = 'https://jsonplaceholder.typicode.com/users';
const LIMIT = 6;
const TOTAL_USERS = 10; // Known from API docs
const TOTAL_PAGES = Math.ceil(TOTAL_USERS / LIMIT);

// Fetch users for a specific page
async function fetchUsers(page) {
  try {
    const response = await fetch(`${API_URL}?_page=${page}&_limit=${LIMIT}`);
    const data = await response.json();
    displayUsers(data);
    highlightActiveButton(page);
  } catch (error) {
    console.error("Error fetching users:", error);
    document.getElementById("user-container").innerHTML = "<p>Error loading users.</p>";
  }
}

// Display the user data
function displayUsers(users) {
  const container = document.getElementById("user-container");
  container.innerHTML = ""; // clear previous content

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
    `;
    container.appendChild(card);
  });
}

// Create pagination buttons
function setupPagination() {
  const buttonContainer = document.getElementById("pagination-buttons");
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", () => fetchUsers(i));
    buttonContainer.appendChild(btn);
  }
}

// Highlight active page button
function highlightActiveButton(activePage) {
  const buttons = document.querySelectorAll(".pagination button");
  buttons.forEach((btn, index) => {
    btn.classList.toggle("active", index + 1 === activePage);
  });
}

// Initialize on load
setupPagination();
fetchUsers(1); // Load Page 1 by default
