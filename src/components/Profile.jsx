import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import localForage from "localforage";
import AppContext from "../context/AppContext";

function Profile() {
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
    localForage.setItem("userName", appContext.profile);
    appContext.setProfile("");
  }

  return (
    <div className="main">
      <p className="profile-header">Profile</p>
      <label className="label">User Name</label>
      <input
        className="profile-input"
        onChange={handleChange}
        value={appContext.profile}
        type="text "
      />
      <button
        value={appContext.profile}
        className="profile-btn"
        onClick={handleClick}
      >
        Save
      </button>
    </div>
  );
}

export default Profile;
