import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import { AuthContext } from "../context/Auth";
import firebase from "../firebase.js";

const Nav = () => {
  const appContext = useContext(AppContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        {currentUser ? (
          <div>
            {!appContext.loadingUpload && (
              <NavLink
                exact
                className="nav-link"
                activeStyle={{ color: "white" }}
                to="/"
              >
                <li>Home</li>
              </NavLink>
            )}
            <NavLink
              className="nav-link"
              activeStyle={{ color: "white" }}
              to="./profile"
            >
              <li>Profile</li>
            </NavLink>
            <div>
              <button
                className="sign-out"
                onClick={() => firebase.auth().signOut()}
              >
                Sign Out
              </button>
              {appContext.image && (
                <>
                  <Link to="/profile">
                    <img
                      src={appContext.image}
                      alt="profile"
                      className="profile-image"
                    />
                  </Link>
                  <div className="nickname">{appContext.nickName}</div>
                </>
              )}
            </div>
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
