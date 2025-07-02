import React from 'react';
import ProfileCard from './ProfileCard';

const App = () => {
  return (
    <div>
      <h1>Profile Card Example</h1>
      <ProfileCard
        name="Souparna Chatterjee"
        age={26}
        bio="Full-stack developer with a passion for building scalable web applications, solving real-world problems, and contributing to open-source."
      />

      <ProfileCard
        age={30} // No name or bio passed → uses defaults
      />
    </div>
  );
};

export default App;
