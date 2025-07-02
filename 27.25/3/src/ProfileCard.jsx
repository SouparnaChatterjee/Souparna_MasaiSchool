import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({
  name = "Anonymous",
  age,
  bio = "This user prefers to keep an air of mystery about them.",
}) => {
  const truncatedBio =
    bio.length > 100 ? bio.slice(0, 100).trim() + '… Read More' : bio;

  return (
    <div className="profile-card">
      <h2>{name}</h2>
      <p><strong>Age:</strong> {age}</p>
      <p className="bio">{truncatedBio}</p>
    </div>
  );
};

export default ProfileCard;
