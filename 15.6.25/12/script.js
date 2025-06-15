// Get reference to the <li> element with id "item2"
const item2 = document.getElementById("item2");

// Add a click event listener to "Item 2"
item2.addEventListener("click", function () {
  // Access and alert the parent node's (ul) text content
  const parent = item2.parentNode;
  alert("Parent content: " + parent.textContent.trim());

  // Get previous and next sibling elements
  const prevSibling = item2.previousElementSibling;
  const nextSibling = item2.nextElementSibling;

  // Log their text content to the console
  if (prevSibling) {
    console.log("Previous sibling:", prevSibling.textContent);
  } else {
    console.log("No previous sibling.");
  }

  if (nextSibling) {
    console.log("Next sibling:", nextSibling.textContent);
  } else {
    console.log("No next sibling.");
  }
});
