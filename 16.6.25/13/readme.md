# Enhanced Todo List with localStorage and Search

## Features
- ✅ Add tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Real-time search through tasks
- ✅ Tasks are saved using `localStorage` and persist across page reloads

## How to Use
1. Enter a task in the input field and click "Add Task".
2. Click on a task to mark it as completed (or unmark it).
3. Use the ❌ button to remove a task.
4. Use the search box to filter tasks in real time.

- HTML
- CSS
- JavaScript
- `localStorage` for data persistence

## How Tasks Are Stored
Each task is stored as an object in an array:
```js
{
  id: 168934891,         // unique ID using Date.now()
  text: "Your task here",
  completed: false       // true if the task is completed
}
