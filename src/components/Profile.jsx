import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import localForage from "localforage";

function Profile() {
  const appContext = useContext(AppContext);

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
