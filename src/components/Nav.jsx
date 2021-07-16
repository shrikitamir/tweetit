import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

const Nav = () => {
  const { currentPage } = useContext(AppContext);

  return (
    <nav>
      <ul>
        <div>
          <Link
            className={currentPage === "/" ? "nav-link-selected" : "nav-link"}
            to="/"
          >
            <li>Home</li>
          </Link>
          <Link
            className={
              currentPage === "/profile" ? "nav-link-selected" : "nav-link"
            }
            to="./profile"
          >
            <li>Profile</li>
          </Link>
        </div>
        <Link
          className={
            currentPage === "/login"
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
