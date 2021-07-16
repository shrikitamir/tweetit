import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import firebase from "../firebase.js";

const Profile = () => {
  const appContext = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    appContext.setCurrentPage(location.pathname);
    // eslint-disable-next-line
  }, []);

  function handleChange(e) {
    appContext.setProfile(e.target.value);
  }

  function handleClick() {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: appContext.profile,
    });
    appContext.setProfile("");
  }

  return (
    <>
      <button className="sign-out" onClick={() => firebase.auth().signOut()}>
        Sign Out
      </button>
      <div className="main">
        <p className="profile-header">Profile</p>
        <label className="profile-label">User Name</label>
        <input
          className="profile-input"
          onChange={handleChange}
          value={appContext.profile}
          type="text"
          maxLength="25"
        />
        <button
          value={appContext.profile}
          className="profile-btn"
          onClick={handleClick}
          type="submit"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Profile;
