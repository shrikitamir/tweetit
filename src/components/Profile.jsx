import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../firebase.js";

const Profile = () => {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imgApprove, setImgApprove] = useState(false);
  const [userNameApprove, setUserNameApprove] = useState(false);
  const appContext = useContext(AppContext);
  const location = useLocation();
  const ref = firebase.firestore().collection("users");

  useEffect(() => {
    appContext.setCurrentPage(location.pathname);
    // eslint-disable-next-line
  }, []);

  function handleChange(e) {
    appContext.setUserName(e.target.value);
  }

  function handleClick() {
    if (!appContext.userName) return;
    setUserNameApprove(true);
    ref.doc(appContext.userId).set(
      {
        userName: appContext.userName,
      },
      { merge: true }
    );
    appContext.setUserName("");
    setTimeout(() => {
      setUserNameApprove(false);
    }, 2500);
  }

  async function handleFile(e) {
    setLoadingUpload(true);
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    fileRef.getDownloadURL().then((fileUrl) => {
      ref.doc(appContext.userId).set(
        {
          photoUrl: fileUrl,
        },
        { merge: true }
      );
      appContext.setImage(fileUrl);
    });
    setLoadingUpload(false);
    setImgApprove(true);
    setTimeout(() => {
      setImgApprove(false);
    }, 2500);
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
          value={appContext.userName}
          type="text"
          maxLength="25"
        />
        <label className="image-label">Profile Image</label>
        <input className="upload-file" type="file" onChange={handleFile} />
        <button className="profile-btn" onClick={handleClick}>
          Save
        </button>
      </div>
      {loadingUpload && <CircularProgress className="img-upload-load" />}
      {imgApprove && <p className="img-uploaded">👍</p>}
      {userNameApprove && <p className="username-approve">👍</p>}
    </>
  );
};

export default Profile;
