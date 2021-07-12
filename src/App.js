import React, { useState, useEffect } from "react";
import CreateTweet from "./components/CreateTweet";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tweet from "./components/Tweet";
import baseURL from "./lib";
import { v4 as uuid } from "uuid";
import axios from "axios";

function App() {
  const [tweetsArr, setTweetsArr] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => setTweetsArr(res.data.tweets))
      .catch((err) => console.error(err));
  }, [tweetsArr]);

  function addTweet(tweet) {
    axios.post(baseURL, tweet).catch((err) => {
      alert("POST FAILED!");
      console.log(err);
    });
  }

  return (
    <div className="main">
      <CreateTweet
        addTweet={
          tweetsArr.length ? addTweet : () => alert("Cant post while loading!")
        }
      />
      {tweetsArr.length ? (
        tweetsArr.map((e) => (
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

export default App;
