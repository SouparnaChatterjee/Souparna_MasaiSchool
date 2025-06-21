// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAh_9w4LqL39ftjwW-vQhbymmXzN9X__VM",
  authDomain: "intro-8fbce.firebaseapp.com",
  databaseURL: "https://intro-8fbce-default-rtdb.firebaseio.com",
  projectId: "intro-8fbce",
  storageBucket: "intro-8fbce.appspot.com",
  messagingSenderId: "921494307110",
  appId: "1:921494307110:web:5969563916ec60ceff01e7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref("users");

const tableBody = document.querySelector("#userTable tbody");
const errorDiv = document.getElementById("error");

// Fetch users from Realtime Database
dbRef.once("value")
  .then(snapshot => {
    const data = snapshot.val();
    if (data) {
      Object.values(data).forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      errorDiv.textContent = "No users found.";
    }
  })
  .catch(error => {
    errorDiv.textContent = "Error fetching data: " + error.message;
  });
