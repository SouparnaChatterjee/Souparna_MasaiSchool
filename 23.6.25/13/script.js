const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userContainer = document.getElementById('user-container');
const sortSelect = document.getElementById('sort');

/**
 * Fetches user data from API and sorts it
 * @param {string} sortBy - The field to sort by (name, username, email)
 */
async function fetchAndDisplayUsers(sortBy = 'name') {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    // Sort users by selected field (A-Z)
    users.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

    renderUsers(users);
  } catch (error) {
    userContainer.innerHTML = '<p class="error">Failed to fetch users. Please try again later.</p>';
    console.error('Error fetching users:', error);
  }
}

/**
 * Renders user cards to the DOM
 * @param {Array} users - List of user objects
 */
function renderUsers(users) {
  userContainer.innerHTML = ''; // Clear previous content

  users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('user-card');

    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;

    userContainer.appendChild(card);
  });
}

// Event Listener: When sort option is changed
sortSelect.addEventListener('change', (e) => {
  const sortBy = e.target.value;
  fetchAndDisplayUsers(sortBy);
});

// Initial Fetch
fetchAndDisplayUsers('name');
