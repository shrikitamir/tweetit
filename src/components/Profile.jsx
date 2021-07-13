import React, { useState } from "react";
import localForage from "localforage";

function Profile() {
  const [profile, setProfile] = useState("");

  function handleChange(e) {
    setProfile(e.target.value);
  }

  function handleClick() {
    localForage.setItem("userName", profile);
  }

  return (
    <div className="main">
      <p className="profile-header">Profile</p>
      <label className="label">User Name</label>
      <input
        className="profile-input"
        onChange={handleChange}
        value={profile}
        type="text "
      />
      <button className="profile-btn" onClick={handleClick}>
        Save
      </button>
    </div>
  );
}

export default Profile;
