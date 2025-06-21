const loadFeedbacks = () => {
  fetch("https://q12sub-default-rtdb.firebaseio.com/feedbacks.json")
    .then(res => res.json())
    .then(data => {
      const tableBody = document.getElementById("feedback-table-body");
      tableBody.innerHTML = "";

      Object.entries(data).forEach(([id, fb]) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${fb.username}</td>
          <td>${fb.message}</td>
          <td>
            <button onclick="deleteUser('${id}')">Delete</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    });
};

const deleteUser = (key) => {
  fetch(`https://q12sub-default-rtdb.firebaseio.com/feedbacks/${key}.json`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) throw new Error("Deletion failed");
      return response.json();
    })
    .then(() => {
      console.log("User deleted successfully");
      loadFeedbacks(); // Refresh table
    })
    .catch(error => console.error("Error deleting user:", error));
};

// Initial load
loadFeedbacks();
