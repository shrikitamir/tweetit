import React, { useEffect, useContext, useState } from "react";
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
            if (doc.exists) {
              appContext.setImage(doc.data().photoUrl);
              appContext.setNickName(doc.data().userName);
              appContext.setTweet((prev) => {
                return {
                  ...prev,
                  img: doc.data().photoUrl,
                  userName: doc.data().userName,
                  user: appContext.userId,
                };
              });
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    })();
    // eslint-disable-next-line
  }, [appContext.userId]);

  useEffect(() => {
    tweetRef.limit(10).onSnapshot((tweets) => {
      const items = [];
      const last = [];
      tweets.forEach((doc) => {
        items.push(doc.data());
        last.push(doc);
      });
      appContext.setTweetsArr(items);
      if (last[last.length - 1]) {
        setLastDoc(last[last.length - 1]);
      } else {
        setIsEmpty(true);
      }
    });
    // eslint-disable-next-line
  }, []);

  window.onscroll = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      if (!isEmpty) {
        tweetRef
          .startAfter(lastDoc)
          .limit(10)
          .onSnapshot((tweets) => {
            const lastY = window.scrollY;
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
              window.scroll(0, lastY);
              if (last[last.length - 1]) {
                setLastDoc(last[last.length - 1]);
              } else {
                setIsEmpty(true);
              }
            } else {
              setIsEmpty(true);
            }
          });
      }
    }
  };

  return (
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
            user={e.user}
          />
        ))
      )}
      {isEmpty && <p className="no-more-tweets">No more tweets to load!</p>}
    </div>
  );
};

export default Home;
