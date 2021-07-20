import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../firebase.js";

const Profile = () => {
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
    appContext.setNickName(appContext.userName);
    appContext.setUserName("");
    setTimeout(() => {
      setUserNameApprove(false);
    }, 2500);
  };

  const handleFile = async (e) => {
    appContext.setLoadingUpload(true);
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
    appContext.setLoadingUpload(false);
    setImgApprove(true);
    setTimeout(() => {
      setImgApprove(false);
    }, 2500);
  };

  return (
    <>
      <div className="main">
        <p className="profile-header">Profile</p>
        <label className="profile-label">User Name</label>
        <input
          className="profile-input"
          onChange={handleChange}
          value={appContext.userName}
          type="text"
          maxLength="14"
        />
        <label className="image-label">Profile Image</label>
        <input className="upload-file" type="file" onChange={handleFile} />
        <button className="profile-btn" onClick={handleClick}>
          Save
        </button>
      </div>
      {appContext.loadingUpload && (
        <CircularProgress className="img-upload-load" />
      )}
      {imgApprove && <p className="img-uploaded">👍</p>}
      {userNameApprove && <p className="username-approve">👍</p>}
    </>
  );
};

export default Profile;
