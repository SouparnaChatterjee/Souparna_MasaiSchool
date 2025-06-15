// Explanation:
// JavaScript event propagation has two phases:
// 1. Capturing Phase: Event travels from the root to the target.
// 2. Bubbling Phase: Event bubbles back up from the target to the root.

// Selecting all elements
const outerDiv = document.getElementById("outer");
const middleDiv = document.getElementById("middle");
const innerDiv = document.getElementById("inner");

const btnOuter = document.getElementById("btnOuter");
const btnMiddle = document.getElementById("btnMiddle");
const btnInner = document.getElementById("btnInner");

// Event listeners in Bubbling Phase (default - third argument false)
outerDiv.addEventListener("click", () => {
  alert("Outer Div (bubbling)");
}, false);

middleDiv.addEventListener("click", () => {
  alert("Middle Div (bubbling)");
}, false);

innerDiv.addEventListener("click", () => {
  alert("Inner Div (bubbling)");
}, false);

btnOuter.addEventListener("click", (e) => {
  alert("Outer Button (bubbling)");
}, false);

btnMiddle.addEventListener("click", (e) => {
  alert("Middle Button (bubbling)");
}, false);

btnInner.addEventListener("click", (e) => {
  alert("Inner Button (bubbling)");

  // Stop further propagation
  e.stopPropagation();
}, false);

// Event listeners in Capturing Phase (third argument true)
outerDiv.addEventListener("click", () => {
  alert("Outer Div (capturing)");
}, true);

middleDiv.addEventListener("click", () => {
  alert("Middle Div (capturing)");
}, true);

innerDiv.addEventListener("click", () => {
  alert("Inner Div (capturing)");
}, true);

btnOuter.addEventListener("click", () => {
  alert("Outer Button (capturing)");
}, true);

btnMiddle.addEventListener("click", () => {
  alert("Middle Button (capturing)");
}, true);

btnInner.addEventListener("click", () => {
  alert("Inner Button (capturing)");
}, true);
