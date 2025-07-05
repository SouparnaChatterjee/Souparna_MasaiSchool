import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuth, toggleAuth } = useContext(AuthContext);

  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <button onClick={toggleAuth}>
        {isAuth ? "Logout" : "Login"}
      </button>
    </nav>
  );
};

export default Navbar;
