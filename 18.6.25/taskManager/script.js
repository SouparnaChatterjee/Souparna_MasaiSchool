const apiUrl = 'https://6852d6cb0594059b23cf4fa2.mockapi.io/tasks';
const taskList = document.getElementById('taskList');

// Fetch and render tasks
async function fetchTasks() {
  taskList.innerHTML = '';
  try {
    const response = await fetch(apiUrl);
    const tasks = await response.json();

    tasks.forEach(task => renderTask(task));
  } catch (error) {
    taskList.innerHTML = '<li>Failed to load tasks.</li>';
  }
}

// Render a single task item
function renderTask(task) {
  const li = document.createElement('li');
  li.setAttribute('data-id', task.id);

  const taskInfo = document.createElement('div');
  taskInfo.className = 'task-info';
  taskInfo.innerHTML = `<strong>${task.title}</strong> - ${task.status}`;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit';
  editBtn.onclick = () => editTask(task, li);

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'delete';
  delBtn.onclick = () => deleteTask(task.id);

  li.append(taskInfo, editBtn, delBtn);
  taskList.appendChild(li);
}

// Inline edit task
function editTask(task, li) {
  li.innerHTML = `
    <input type="text" id="editTitle" value="${task.title}" />
    <select id="editStatus">
      <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
      <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
    </select>
    <button class="save">Save</button>
    <button class="cancel">Cancel</button>
  `;

  li.querySelector('.save').onclick = async () => {
    const newTitle = li.querySelector('#editTitle').value.trim();
    const newStatus = li.querySelector('#editStatus').value;

    if (newTitle === '') {
      alert('Task title cannot be empty!');
      return;
    }

    try {
      await fetch(`${apiUrl}/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, status: newStatus })
      });
      fetchTasks();
    } catch (err) {
      alert('Failed to update task.');
    }
  };

  li.querySelector('.cancel').onclick = () => fetchTasks();
}

// Delete task
async function deleteTask(id) {
  const confirmDelete = confirm('Are you sure you want to delete this task?');
  if (!confirmDelete) return;

  try {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchTasks();
  } catch (err) {
    alert('Failed to delete task.');
  }
}

// Load tasks on page load
fetchTasks();
