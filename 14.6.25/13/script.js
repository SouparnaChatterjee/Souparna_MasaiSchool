function changeBackground() {
  const color = document.getElementById("colorInput").value.trim();
  const div = document.getElementById("outputDiv");
  div.style.backgroundColor = "";

  const testColor = document.createElement("div");
  testColor.style.backgroundColor = color;

  if (testColor.style.backgroundColor === "") {
    alert("Invalid color name!");
  } else {
    div.style.backgroundColor = color;
  }
}

function updateText() {
  const text = document.getElementById("textInput").value.trim();
  const div = document.getElementById("outputDiv");

  if (text === "") {
    alert("Please enter some text!");
  } else {
    div.textContent = text;
  }
}
