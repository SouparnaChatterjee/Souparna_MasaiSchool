document.getElementById("registrationForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!name || !email || !password) {
    message.style.color = "red";
    message.innerText = "Please fill in all fields.";
    return;
  }

  try {
    const response = await fetch("https://6852d8a60594059b23cf558a.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      message.style.color = "green";
      message.innerText = `User ${data.name} registered successfully!`;
      document.getElementById("registrationForm").reset();
    } else {
      throw new Error("Failed to register user.");
    }
  } catch (error) {
    message.style.color = "red";
    message.innerText = "Error: Could not register. Try again.";
  }
});
