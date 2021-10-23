import React, { useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import firebase from "../firebase.js";

const CreateTweet = () => {
  const appContext = useContext(AppContext);
  const tweetRef = firebase.firestore().collection("tweets");

  useEffect(() => {
    if (appContext.tweet.content.length > 140) {
      appContext.setIsDisabled(true);
    } else {
      appContext.setIsDisabled(false);
    }
    // eslint-disable-next-line
  }, [appContext.tweet]);

  const handleChange = (e) => {
    appContext.setTweet((prev) => {
      return { ...prev, content: e.target.value };
    });
  };

  const formattedDate = () => {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appContext.tweet.content) return;
    tweetRef
      .doc()
      .set({
        ...appContext.tweet,
        date: formattedDate(),
        sort: new Date().getTime(),
      })
      .catch((err) => {
        console.log(err);
      });
    appContext.setTweet((prev) => {
      return { ...prev, content: "" };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={handleChange}
        value={appContext.tweet.content}
        placeholder="What you have in mind..."
        rows="6"
        maxLength="350"
        spellCheck="false"
        className="tweet-area"
        type="text"
      />
      {appContext.isDisabled && (
        <p>The tweet can't contain more then 140 chars.</p>
      )}
      <button
        type="submit"
        disabled={appContext.isDisabled || appContext.tweetsArr[0] === 1}
        className="tweet-btn"
      >
        TweetIt!
      </button>
    </form>
  );
};

export default CreateTweet;
