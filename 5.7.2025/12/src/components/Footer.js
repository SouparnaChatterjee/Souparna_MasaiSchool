import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Footer = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <footer style={{ padding: "1rem", background: "#ddd" }}>
      <p>{isAuth ? "Welcome, User" : "Please log in"}</p>
    </footer>
  );
};

export default Footer;
