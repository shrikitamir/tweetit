import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../firebase.js";

const Profile = () => {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imgApprove, setImgApprove] = useState(false);
  const [userNameApprove, setUserNameApprove] = useState(false);
  const appContext = useContext(AppContext);
  const usersRef = firebase.firestore().collection("users");

  const handleChange = (e) => {
    appContext.setUserName(e.target.value);
  };

  const handleClick = () => {
    if (!appContext.userName) return;
    usersRef.doc(appContext.userId).set(
      {
        userName: appContext.userName,
      },
      { merge: true }
    );
    setUserNameApprove(true);
    appContext.setUserName("");
    setTimeout(() => {
      setUserNameApprove(false);
    }, 2500);
  };

  const handleFile = async (e) => {
    setLoadingUpload(true);
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    fileRef.getDownloadURL().then((fileUrl) => {
      usersRef.doc(appContext.userId).set(
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
  };

  return (
    <>
      <button className="sign-out" onClick={() => firebase.auth().signOut()}>
        Sign Out
      </button>
      {appContext.image && (
        <img src={appContext.image} alt="profile" className="profile-image" />
      )}
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
