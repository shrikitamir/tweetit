import React, { useState, useEffect } from "react";

function CreateTweet(props) {
  const [tweet, setTweet] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (tweet.length > 140) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [tweet]);

  function handleSubmit(e) {
    props.addTweet(tweet);
    setTweet("");
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setTweet(e.target.value)}
        value={tweet}
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
