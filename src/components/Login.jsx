import React, { useCallback, useContext, useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import { useLocation, Link } from "react-router-dom";
import firebase from "../firebase.js";
import AppContext from "../context/AppContext";
import { AuthContext } from "../context/Auth.js";

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const { setCurrentPage } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
    // eslint-disable-next-line
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const { email, password } = e.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (err) {
        alert(err);
      }
    },
    [history]
  );

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main">
      <p className="login-header">Log in</p>
      <form onSubmit={handleLogin}>
        <label className="login-label">
          Email
          <input
            autoComplete="off"
            className="login-input"
            name="email"
            type="email"
            placeholder="Email"
          ></input>
        </label>
        <label className="login-label">
          Password
          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="Password"
          ></input>
        </label>
        <button className="login-btn" type="submit">
          Log in
        </button>
      </form>
      <Link to="/signup">
        <p className="not-a-user">Not a user? Sign up!</p>
      </Link>
    </div>
  );
};

export default withRouter(Login);
