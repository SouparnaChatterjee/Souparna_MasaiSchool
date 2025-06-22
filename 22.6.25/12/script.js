import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB1iXUQSJY7Z6Ivbx4-zPymHrXWZUCw1PU",
  authDomain: "questions-a9f70.firebaseapp.com",
  projectId: "questions-a9f70",
  storageBucket: "questions-a9f70.firebasestorage.app",
  messagingSenderId: "1088055363458",
  appId: "1:1088055363458:web:43adb60ef7b2881225b19b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const novelList = document.getElementById("novelList");
const searchInput = document.getElementById("search");
const yearFilter = document.getElementById("yearFilter");
const sortPrice = document.getElementById("sortPrice");

// Fetch and render novels
async function fetchAndRenderNovels() {
  let q = collection(db, "novels");

  const filters = [];
  const year = yearFilter.value;
  const search = searchInput.value.toLowerCase();
  const sort = sortPrice.value;

  if (year) filters.push(where("release_year", "==", Number(year)));
  if (sort === "asc") filters.push(orderBy("price", "asc"));
  if (sort === "desc") filters.push(orderBy("price", "desc"));

  let finalQuery = query(q, ...filters);
  const querySnapshot = await getDocs(finalQuery);

  let novels = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // Apply local search
    if (
      !search ||
      data.title.toLowerCase().includes(search) ||
      data.author.toLowerCase().includes(search)
    ) {
      novels.push(data);
    }
  });

  render(novels);
}

function render(novels) {
  novelList.innerHTML = "";
  novels.forEach((novel) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h2>${novel.title}</h2>
      <p><strong>Author:</strong> ${novel.author}</p>
      <p><strong>Price:</strong> ₹${novel.price}</p>
      <p><strong>Year:</strong> ${novel.release_year}</p>
      <p><strong>Genre:</strong> ${novel.genre}</p>
    `;
    novelList.appendChild(div);
  });
}

// Listeners
searchInput.addEventListener("input", fetchAndRenderNovels);
yearFilter.addEventListener("change", fetchAndRenderNovels);
sortPrice.addEventListener("change", fetchAndRenderNovels);

// Initial load
fetchAndRenderNovels();
