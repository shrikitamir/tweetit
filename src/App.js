import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import { v4 as uuid } from "uuid";
import baseURL from "./lib";
import CreateTweet from "./components/CreateTweet";
import Tweet from "./components/Tweet";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import AppContext from "./context/AppContext";

function App() {
  const [tweetsArr, setTweetsArr] = useState([]);
  const [profile, setProfile] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [tweet, setTweet] = useState({
    content: "",
    userName: "",
    date: new Date().toISOString(),
  });

  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => setTweetsArr(res.data.tweets))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(baseURL)
        .then((res) => setTweetsArr(res.data.tweets))
        .catch((err) => console.error(err));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function addTweet(tweet) {
    axios.post(baseURL, tweet).catch((err) => {
      alert("POST FAILED!");
      console.log(err);
    });
    setTweetsArr((prev) => {
      return [tweet, ...prev];
    });
  }

  return (
    <>
      <AppContext.Provider
        value={{
          profile: profile,
          setProfile: setProfile,
          isDisabled: isDisabled,
          setIsDisabled: setIsDisabled,
          tweet: tweet,
          setTweet: setTweet,
        }}
      >
        <Router>
          <Nav />
          <Switch>
            <Route exact={true} path="/">
              <div className="main">
                <CreateTweet
                  addTweet={
                    tweetsArr.length
                      ? addTweet
                      : () => alert("Cant post while loading!")
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
            </Route>
            <Route path="/profile" component={Profile} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
