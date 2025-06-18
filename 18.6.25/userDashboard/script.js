const apiUrl = 'https://6852d2b80594059b23cf3df9.mockapi.io/users';
const usersList = document.getElementById('users');
const form = document.getElementById('addUserForm');
const errorMsg = document.getElementById('error');

// Fetch and display all users
async function fetchUsers() {
  usersList.innerHTML = '';
  try {
    const response = await fetch(apiUrl);
    const users = await response.json();

    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} (${user.email})`;
      usersList.appendChild(li);
    });
  } catch (error) {
    usersList.innerHTML = '<li>Failed to load users.</li>';
  }
}

// Add new user
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMsg.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    errorMsg.textContent = 'Both name and email are required.';
    return;
  }

  // Check for duplicate email
  try {
    const existingUsers = await fetch(apiUrl).then(res => res.json());
    const isDuplicate = existingUsers.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (isDuplicate) {
      errorMsg.textContent = 'Email already exists!';
      return;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    if (!response.ok) throw new Error('Failed to add user.');

    form.reset();
    fetchUsers();
  } catch (error) {
    errorMsg.textContent = 'Error while adding user.';
  }
});

// Initial load
fetchUsers();
