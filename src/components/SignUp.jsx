import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import AppContext from "../context/AppContext";
import firebase from "firebase";

const SignUp = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const appContext = useContext(AppContext);
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
                  userName: "undefined",
                  photoUrl: anonymous,
                });
              }
            });
          appContext.setUserId(cred.user.uid);
        });
      history.push("/");
    } catch (err) {
      alert(err);
    }
  };

  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      const { email, password, confirmPassword } = e.target.elements;
      if (password.value === confirmPassword.value) {
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((cred) => {
              usersRef.doc(cred.user.uid).set({
                userName: "undefined",
                photoUrl: anonymous,
              });
              appContext.setUserId(cred.user.uid);
            });
          history.push("/");
        } catch (err) {
          alert(err);
        }
      } else {
        alert("Passwords don't match");
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
        <label className="login-label">
          Confirm password
          <input
            className="login-input"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          ></input>
        </label>
        <button className="login-btn register-btn" type="submit">
          Sign up
        </button>
        <button
          className="login-btn-google register-btn-google"
          onClick={handleGoogleSignUp}
        >
          Sign up with Google
        </button>
      </form>
      <Link to="/login">
        <p className="not-a-user">Already a user? Log in!</p>
      </Link>
    </div>
  );
};

export default withRouter(SignUp);
