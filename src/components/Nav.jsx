import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

const Nav = () => {
  const appContext = useContext(AppContext);

  return (
    <nav>
      <ul>
        <Link
          className={
            appContext.currentPage === "/" ? "nav-link-selected" : "nav-link"
          }
          to="/"
        >
          <li>Home</li>
        </Link>
        <Link
          className={
            appContext.currentPage === "/profile"
              ? "nav-link-selected"
              : "nav-link"
          }
          to="./profile"
        >
          <li>Profile</li>
        </Link>
        <Link
          className={
            appContext.currentPage === "/login"
              ? "nav-link-selected login-link"
              : "nav-link login-link"
          }
          to="./login"
        >
          <li>Log in</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
