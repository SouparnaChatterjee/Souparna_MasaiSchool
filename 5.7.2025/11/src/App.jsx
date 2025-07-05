import React, { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import NestedComponent from "./components/NestedComponent";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return <button onClick={toggleTheme}>Current: {theme}</button>;
};

const App = () => (
  <ThemeProvider>
    <div style={{ padding: "20px" }}>
      <h1>Context API Theme Toggle</h1>
      <ThemeToggleButton />
      <NestedComponent />
    </div>
  </ThemeProvider>
);

export default App;
