let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Update the UI and save to localStorage
function updateTasks() {
  const list = document.getElementById("taskList");
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  list.innerHTML = ""; // Clear list before rendering

  tasks.forEach((task) => {
    if (task.text.toLowerCase().includes(searchTerm)) {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      const span = document.createElement("span");
      span.className = "task-text";
      span.innerText = task.text;

      // Toggle completed state on click
      span.onclick = () => {
        task.completed = !task.completed;
        saveTasks();
        updateTasks();
      };

      const delBtn = document.createElement("button");
      delBtn.innerText = "❌";
      delBtn.onclick = () => {
        tasks = tasks.filter((t) => t.id !== task.id);
        saveTasks();
        updateTasks();
      };

      li.appendChild(span);
      li.appendChild(delBtn);
      list.appendChild(li);
    }
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };

  tasks.push(newTask);
  input.value = "";
  saveTasks();
  updateTasks();
}

// Search input triggers update in real-time
document.getElementById("searchInput").addEventListener("input", updateTasks);

// Load tasks initially
updateTasks();
