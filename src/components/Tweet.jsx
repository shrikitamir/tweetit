import React from "react";

function Tweet(props) {
  return (
    <div className="tweet-box">
      <div className="tweet-box-top">
        <div>
          <img className="tweet-img" alt="profile" src={props.img} />
          <span className="tweet-username">{props.userName}</span>
        </div>
        <span>{props.date}</span>
      </div>
      <p>{props.content}</p>
    </div>
  );
}

export default Tweet;
