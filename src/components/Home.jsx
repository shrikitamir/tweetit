import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import firebase from "../firebase.js";
import LinearProgress from "@material-ui/core/LinearProgress";
import { v4 as uuid } from "uuid";
import CreateTweet from "./CreateTweet";
import Tweet from "./Tweet";

const Home = () => {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const ref = firebase.firestore().collection("tweets");

  useEffect(() => {
    appContext.setCurrentPage(location.pathname);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      appContext.setTweetsArr(items);
    });
    // eslint-disable-next-line
  }, []);

  function addTweet(tweet) {
    ref
      .doc()
      .set(tweet)
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <button className="sign-out" onClick={() => firebase.auth().signOut()}>
        Sign Out
      </button>
      <div className="main">
        <CreateTweet
          addTweet={
            appContext.tweetsArr
              ? addTweet
              : () => alert("Cant post while loading!")
          }
        />
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
