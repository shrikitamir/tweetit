import React, { useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import firebase from "../firebase.js";
import { v4 as uuid } from "uuid";
import LinearProgress from "@material-ui/core/LinearProgress";
import CreateTweet from "./CreateTweet";
import Tweet from "./Tweet";

const Home = () => {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const ref = firebase.firestore().collection("tweets");

  useEffect(() => {
    (async () => {
      const user = firebase.auth().currentUser.uid;
      appContext.setUserId(user);
      try {
        const doc = await firebase
          .firestore()
          .collection("users")
          .doc(appContext.userId)
          .get();
        const { photoUrl, userName } =
          doc._delegate._document.data.value.mapValue.fields;
        appContext.setImage(photoUrl.stringValue);
        appContext.setTweet((prev) => {
          return {
            ...prev,
            img: photoUrl.stringValue,
            userName: userName.stringValue,
          };
        });
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line
  }, [appContext.userId]);

  useEffect(() => {
    appContext.setCurrentPage(location.pathname);
    ref.orderBy("sort", "desc").onSnapshot((tweets) => {
      const items = [];
      tweets.forEach((doc) => {
        items.push(doc.data());
      });
      appContext.setTweetsArr(items);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <button className="sign-out" onClick={() => firebase.auth().signOut()}>
        Sign Out
      </button>
      {appContext.image && (
        <Link to="/profile">
          <img src={appContext.image} alt="profile" className="profile-image" />
        </Link>
      )}
      <div className="main">
        <CreateTweet />
        {appContext.tweetsArr[0] === 1 ? (
          <LinearProgress className="in-progress" />
        ) : (
          appContext.tweetsArr.map((e) => (
            <Tweet
              key={uuid()}
              userName={e.userName}
              date={e.date}
              content={e.content}
              img={e.img}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
