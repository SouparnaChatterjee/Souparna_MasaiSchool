import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Main = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <main style={{ padding: "1rem" }}>
      <h2>{isAuth ? "You are logged in!" : "Please log in to continue."}</h2>
    </main>
  );
};

export default Main;
