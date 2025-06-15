const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const counters = document.getElementById("counters");

const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const incompleteBtn = document.getElementById("incompleteBtn");
const sortBtn = document.getElementById("sortBtn");

// Master array to keep track of all tasks
let tasks = [];

// Flag to control current filter view
let currentFilter = "all";

// Add new task
addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  // Task object with text and completed status
  const newTask = {
    id: Date.now(),         // Unique ID
    text: text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTasks(); // Update UI
};

// Event delegation for task list (delete & toggle)
taskList.addEventListener("click", (e) => {
  const id = Number(e.target.closest("li")?.dataset?.id);

  if (e.target.classList.contains("delete-btn")) {
    // Remove task by filtering out the clicked task
    tasks = tasks.filter(task => task.id !== id);
  } else if (e.target.classList.contains("checkbox")) {
    // Toggle task completion status
    tasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
  }

  renderTasks(); // Update UI after changes
});

// Filter buttons
allBtn.onclick = () => {
  currentFilter = "all";
  renderTasks();
};

completedBtn.onclick = () => {
  currentFilter = "completed";
  renderTasks();
};

incompleteBtn.onclick = () => {
  currentFilter = "incomplete";
  renderTasks();
};

// Sort tasks alphabetically by text
sortBtn.onclick = () => {
  tasks.sort((a, b) => a.text.localeCompare(b.text));
  renderTasks();
};

// Function to render tasks based on current filter
function renderTasks() {
  taskList.innerHTML = "";

  // ✅ HOF filter() to select tasks to display based on the current filter
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "incomplete") return !task.completed;
    return true; // for 'all'
  });

  // ✅ HOF map() to transform task objects into list items
  filteredTasks.map(task => {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.classList.add("checkbox");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateCounters(); // Refresh counters after rendering
}

// Function to update total/completed/incomplete counts
function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length; // ✅ HOF filter()
  const incomplete = total - completed;
  counters.textContent = `Total: ${total} | Completed: ${completed} | Incomplete: ${incomplete}`;
}
