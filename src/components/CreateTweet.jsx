import React, { useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import localForage from "localforage";

function CreateTweet(props) {
  const appContext = useContext(AppContext);

  useEffect(() => {
    localForage.getItem("userName").then((data) => {
      appContext.setTweet((prev) => {
        return { ...prev, userName: data };
      });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (appContext.tweet.content.length > 140) {
      appContext.setIsDisabled(true);
    } else {
      appContext.setIsDisabled(false);
    }
    // eslint-disable-next-line
  }, [appContext.tweet]);

  function handleChange(e) {
    appContext.setTweet((prev) => {
      return { ...prev, content: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (appContext.tweet.content.length === 0) return;
    props.addTweet(appContext.tweet);
    appContext.setTweet((prev) => {
      return { ...prev, content: "" };
    });
  }

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
        disabled={appContext.isDisabled}
        className="tweet-btn"
      >
        TweetIt!
      </button>
    </form>
  );
}

export default CreateTweet;
