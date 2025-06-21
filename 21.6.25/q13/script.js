const API_URL = "https://q12sub-default-rtdb.firebaseio.com/feedbacks";

const form = document.getElementById("feedbackForm");
const statusMsg = document.getElementById("status");
const tableBody = document.querySelector("#feedbackTable tbody");

const editModal = document.getElementById("editModal");
const editUsername = document.getElementById("editUsername");
const editMessage = document.getElementById("editMessage");
const saveEditBtn = document.getElementById("saveEdit");
const cancelEditBtn = document.getElementById("cancelEdit");

let currentEditId = null;

// Submit new feedback
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!username || !message) return;

  const feedback = {
    username,
    message,
    timestamp: new Date().toISOString()
  };

  fetch(`${API_URL}.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedback)
  })
    .then(res => res.json())
    .then(() => {
      statusMsg.textContent = "Feedback submitted!";
      statusMsg.style.color = "green";
      form.reset();
      loadFeedbacks();
    })
    .catch(() => {
      statusMsg.textContent = "Error submitting feedback.";
      statusMsg.style.color = "red";
    });
});

// Load feedback
function loadFeedbacks() {
  tableBody.innerHTML = "";
  fetch(`${API_URL}.json`)
    .then(res => res.json())
    .then(data => {
      if (!data) return;

      Object.entries(data).forEach(([id, fb]) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${fb.username}</td>
          <td>${fb.message}</td>
          <td>
            <button onclick="editFeedback('${id}', '${fb.username}', \`${fb.message.replace(/`/g, "\\`")}\`)">Edit</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    });
}

// Edit feedback
window.editFeedback = function(id, username, message) {
  currentEditId = id;
  editUsername.value = username;
  editMessage.value = message;
  editModal.style.display = "flex";
};

// Save edited feedback
saveEditBtn.addEventListener("click", () => {
  const updated = {
    username: editUsername.value,
    message: editMessage.value
  };

  fetch(`${API_URL}/${currentEditId}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  })
  .then(() => {
    editModal.style.display = "none";
    loadFeedbacks();
  });
});

cancelEditBtn.addEventListener("click", () => {
  editModal.style.display = "none";
});

// Initial load
loadFeedbacks();
