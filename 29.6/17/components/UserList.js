import React from "react";
import UserCard from "./UserCard";

function UserList({ users }) {
  return (
    <div>
      {users.map((user, idx) => (
        <UserCard key={idx} user={user} />
      ))}
    </div>
  );
}

export default UserList;
