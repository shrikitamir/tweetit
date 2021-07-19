import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const Nav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        {currentUser ? (
          <div>
            <NavLink
              exact
              className="nav-link"
              activeStyle={{ color: "white" }}
              to="/"
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              className="nav-link"
              activeStyle={{ color: "white" }}
              to="./profile"
            >
              <li>Profile</li>
            </NavLink>
          </div>
        ) : (
          <NavLink
            className="nav-link"
            activeStyle={{ color: "white" }}
            to="./login"
          >
            <li>Log in</li>
          </NavLink>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
