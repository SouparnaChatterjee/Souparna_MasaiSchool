// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD8HqiO3_f7ssZa101HgBHUP1b55To4mHI",
  authDomain: "librarymanagement-6d68d.firebaseapp.com",
  databaseURL: "https://librarymanagement-6d68d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "librarymanagement-6d68d",
  storageBucket: "librarymanagement-6d68d.appspot.com",
  messagingSenderId: "1075727495519",
  appId: "1:1075727495519:web:66804cd0c34f8f90d3c6ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Add book
document.getElementById("bookForm").addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const year = parseInt(document.getElementById("year").value);

  const newBookRef = push(ref(db, "books"));
  set(newBookRef, {
    title,
    author,
    genre,
    publishedYear: year,
    available: true
  });

  e.target.reset();
});

// Fetch and display books
function fetchBooks() {
  const booksRef = ref(db, "books");
  onValue(booksRef, snapshot => {
    const data = snapshot.val();
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    for (let id in data) {
      const book = data[id];
      const li = document.createElement("li");
      li.textContent = `${book.title} by ${book.author} [${book.genre}, ${book.publishedYear}] - ${book.available ? "Available" : "Not Available"}`;
      bookList.appendChild(li);
    }
  });
}

fetchBooks();
