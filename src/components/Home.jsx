import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import { v4 as uuid } from "uuid";
import baseURL from "../lib";
import CreateTweet from "./CreateTweet";
import Tweet from "./Tweet";
import AppContext from "../context/AppContext";

function Home() {
  const appContext = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    appContext.setCurrentPage(location.pathname);
    axios
      .get(baseURL)
      .then((res) => appContext.setTweetsArr(res.data.tweets))
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(baseURL)
        .then((res) => appContext.setTweetsArr(res.data.tweets))
        .catch((err) => console.error(err));
    }, 6000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  function addTweet(tweet) {
    axios.post(baseURL, tweet).catch((err) => {
      alert("POST FAILED!");
      console.log(err);
    });
    appContext.setTweetsArr((prev) => {
      return [tweet, ...prev];
    });
  }

  return (
    <div className="main">
      <CreateTweet
        addTweet={
          appContext.tweetsArr.length
            ? addTweet
            : () => alert("Cant post while loading!")
        }
      />
      {appContext.tweetsArr.length ? (
        appContext.tweetsArr.map((e) => (
          <Tweet
            key={uuid()}
            userName={e.userName}
            date={e.date}
            content={e.content}
          />
        ))
      ) : (
        <LinearProgress className="in-progress" />
      )}
    </div>
  );
}

export default Home;
