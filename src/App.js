import React, { useState, useEffect } from "react";
import CreateTweet from "./components/CreateTweet";
import Tweet from "./components/Tweet";
import * as localForage from "localforage";

function App() {
  const [tweetsArr, setTweetsArr] = useState([]);

  useEffect(() => {
    localForage.getItem("tweets").then((data) => {
      if (data === null) return;
      setTweetsArr(data);
    });
  }, []);

  useEffect(() => {
    localForage.setItem("tweets", tweetsArr);
  }, [tweetsArr]);

  function addTweet(tweet) {
    setTweetsArr((prev) => {
      return [tweet, ...prev];
    });
  }

  return (
    <div className="main">
      <CreateTweet addTweet={addTweet} />
      {tweetsArr.map((e, index) => (
        <Tweet key={index} content={e} />
      ))}
    </div>
  );
}

export default App;
