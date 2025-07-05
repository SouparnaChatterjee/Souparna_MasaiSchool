import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import DeepNestedComponent from "./DeepNestedComponent";

const NestedComponent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <h2>Nested Component</h2>
      <DeepNestedComponent />
    </div>
  );
};

export default NestedComponent;
