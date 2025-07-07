import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
};

export default Profile;
