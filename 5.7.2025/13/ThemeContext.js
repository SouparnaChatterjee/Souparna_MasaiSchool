import React, { createContext } from 'react';
import { useColorMode } from '@chakra-ui/react';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ThemeContext.Provider value={{ theme: colorMode, toggleTheme: toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
