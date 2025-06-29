import React from "react";

function UserCard({ user }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "10px",
      marginBottom: "10px",
      width: "300px"
    }}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default UserCard;
