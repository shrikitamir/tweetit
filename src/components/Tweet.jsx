import React from "react";

function Tweet(props) {
  return (
    <div className="tweet-box">
      <div className="tweet-box-top">
        <span>tamirshriki</span>
        <span>11/07/2021 15:12:41</span>
      </div>
      <p>{props.content}</p>
    </div>
  );
}

export default Tweet;
