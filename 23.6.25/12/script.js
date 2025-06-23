const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userContainer = document.getElementById('user-container');
const sortSelect = document.getElementById('sort');

// Fetch and display users
async function fetchAndDisplayUsers(sortBy) {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    // Sort based on selected field
    users.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

    renderUsers(users);
  } catch (error) {
    userContainer.innerHTML = "<p>Failed to load users. Try again later.</p>";
    console.error("Error fetching users:", error);
  }
}

// Render users
function renderUsers(users) {
  userContainer.innerHTML = ''; // Clear previous content

  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;
    userContainer.appendChild(card);
  });
}

// Event: Sort change
sortSelect.addEventListener('change', (e) => {
  const sortBy = e.target.value;
  fetchAndDisplayUsers(sortBy);
});

// Initial load
fetchAndDisplayUsers('name');
