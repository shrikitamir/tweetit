import React, { useState, useEffect } from "react";
import localForage from "localforage";

function CreateTweet(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [tweet, setTweet] = useState({
    content: "",
    userName: "",
    date: new Date().toISOString(),
  });

  useEffect(() => {
    localForage.getItem("userName").then((data) => {
      setTweet((prev) => {
        return { ...prev, userName: data };
      });
    });
  }, []);

  useEffect(() => {
    if (tweet.content.length > 140) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [tweet]);

  function handleChange(e) {
    setTweet((prev) => {
      return { ...prev, content: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (tweet.content.length === 0) return;
    props.addTweet(tweet);
    setTweet({
      content: "",
      userName: "",
      date: new Date().toISOString(),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={handleChange}
        value={tweet.content}
        placeholder="What you have in mind..."
        rows="6"
        maxLength="350"
        spellCheck="false"
        className="tweet-area"
        type="text"
      />
      {isDisabled && <p>The tweet can't contain more then 140 chars.</p>}
      <button type="submit" disabled={isDisabled} className="tweet-btn">
        TweetIt!
      </button>
    </form>
  );
}

export default CreateTweet;
