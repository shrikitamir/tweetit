import React from "react";

function Tweet(props) {
  return (
    <div className="tweet-box">
      <div className="tweet-box-top">
        <span>{props.userName}</span>
        <span>{props.date}</span>
      </div>
      <p>{props.content}</p>
    </div>
  );
}

export default Tweet;
