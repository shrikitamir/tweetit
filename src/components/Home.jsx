import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
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
            />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
