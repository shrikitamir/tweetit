import React, { useEffect, useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import firebase from "../firebase.js";
import { v4 as uuid } from "uuid";
import LinearProgress from "@material-ui/core/LinearProgress";
import CreateTweet from "./CreateTweet";
import Tweet from "./Tweet";

const Home = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDoc, setLastDoc] = useState();
  const appContext = useContext(AppContext);
  const location = useLocation();
  const usersRef = firebase.firestore().collection("users");
  const tweetRef = firebase
    .firestore()
    .collection("tweets")
    .orderBy("sort", "desc");

  useEffect(() => {
    (async () => {
      const user = firebase.auth().currentUser.uid;
      appContext.setUserId(user);
      if (appContext.userId) {
        try {
          const docRef = usersRef.doc(appContext.userId);
          docRef.get().then((doc) => {
            appContext.setImage(doc.data().photoUrl);
            appContext.setTweet((prev) => {
              return {
                ...prev,
                img: doc.data().photoUrl,
                userName: doc.data().userName,
              };
            });
          });
        } catch (err) {
          console.log(err);
        }
      }
    })();
    // eslint-disable-next-line
  }, [appContext.userId]);

  useEffect(() => {
    appContext.setCurrentPage(location.pathname);
    tweetRef.limit(5).onSnapshot((tweets) => {
      const items = [];
      const last = [];
      tweets.forEach((doc) => {
        items.push(doc.data());
        last.push(doc);
      });
      appContext.setTweetsArr(items);
      setLastDoc(last[last.length - 1]);
    });
    // eslint-disable-next-line
  }, []);

  function fetchMore() {
    if (!isEmpty) {
      tweetRef
        .startAfter(lastDoc)
        .limit(5)
        .onSnapshot((tweets) => {
          const isCollectionEmpty = tweets.size === 0;
          if (!isCollectionEmpty) {
            const items = [];
            const last = [];
            tweets.forEach((doc) => {
              items.push(doc.data());
              last.push(doc);
            });
            appContext.setTweetsArr((prev) => {
              return [...prev, ...items];
            });
            setLastDoc(last[last.length - 1]);
          } else {
            setIsEmpty(true);
          }
        });
    }
  }

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
        {appContext.tweetsArr[0] === 1
          ? null
          : !isEmpty && (
              <button className="load-more-btn" onClick={fetchMore}>
                Load more tweets!
              </button>
            )}
        {isEmpty && <p className="no-more-tweets">No more tweets to load!</p>}
      </div>
    </>
  );
};

export default Home;
