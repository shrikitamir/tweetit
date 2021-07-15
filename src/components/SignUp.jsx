import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import firebase from "firebase";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      const { email, password } = e.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (err) {
        alert(err);
      }
    },
    [history]
  );

  return (
    <div className="main">
      <p className="login-header">Sign Up</p>
      <form onSubmit={handleSignUp}>
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
          Sign up
        </button>
      </form>
      <Link to="/login">
        <p className="not-a-user">Already a user? Log in!</p>
      </Link>
    </div>
  );
};

export default withRouter(SignUp);
