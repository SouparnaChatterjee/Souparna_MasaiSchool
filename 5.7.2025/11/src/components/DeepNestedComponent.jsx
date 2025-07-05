import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const DeepNestedComponent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px",
        backgroundColor: theme === "light" ? "#fff" : "#555",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      Deep Nested Component
    </div>
  );
};

export default DeepNestedComponent;
