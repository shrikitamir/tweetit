import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.js";
import firebase from "../firebase.js";

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const usersRef = firebase.firestore().collection("users");
  const anonymous =
    "https://firebasestorage.googleapis.com/v0/b/tweetit-2a9fb.appspot.com/o/anonymous.jpg?alt=media&token=f7ca78e1-ac6d-46f1-8d19-ac3af0178ad1";

  const handleGoogleSignUp = async () => {
    try {
      const google = new firebase.auth.GoogleAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(google)
        .then((cred) => {
          usersRef
            .doc(cred.user.uid)
            .get()
            .then((doc) => {
              if (!doc.exists) {
                usersRef.doc(cred.user.uid).set({
                  userName: "noUsername",
                  photoUrl: anonymous,
                });
              }
            });
        });
      history.push("/");
    } catch (err) {
      alert(err);
    }
  };

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
    // eslint-disable-next-line
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
        <button className="login-btn-google" onClick={handleGoogleSignUp}>
          Log in with Google
        </button>
      </form>
      <Link to="/signup">
        <p className="not-a-user">Not a user? Sign up!</p>
      </Link>
    </div>
  );
};

export default withRouter(Login);
