import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const mockUser = {
  name: "Souparna Chatterjee",
  email: "souparnachatterjee98@gmail.com"
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);

  const updateUser = (newUser) => {
    setUser(prev => ({ ...prev, ...newUser }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
