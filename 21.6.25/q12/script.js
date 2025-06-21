const form = document.getElementById('feedbackForm');
const statusMsg = document.getElementById('status');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!username || !message) {
    statusMsg.textContent = "Both fields are required!";
    statusMsg.style.color = "red";
    return;
  }

  const feedback = {
    username,
    message,
    timestamp: new Date().toISOString()
  };

  fetch("https://q12sub-default-rtdb.firebaseio.com/feedbacks.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(feedback)
  })
  .then(res => {
    if (!res.ok) throw new Error("Network error");
    return res.json();
  })
  .then(data => {
    statusMsg.textContent = "Feedback submitted successfully!";
    statusMsg.style.color = "green";
    form.reset();
  })
  .catch(err => {
    statusMsg.textContent = "Error submitting feedback.";
    statusMsg.style.color = "red";
    console.error(err);
  });
});
