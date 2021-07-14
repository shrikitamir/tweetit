import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppContext from "./context/AppContext";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";

function App() {
  const [currentPage, setCurrentPage] = useState();
  const [tweetsArr, setTweetsArr] = useState([]);
  const [profile, setProfile] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [tweet, setTweet] = useState({
    content: "",
    userName: "",
    date: new Date().toISOString(),
  });

  return (
    <AppContext.Provider
      value={{
        profile: profile,
        setProfile: setProfile,
        isDisabled: isDisabled,
        setIsDisabled: setIsDisabled,
        tweetsArr: tweetsArr,
        setTweetsArr: setTweetsArr,
        tweet: tweet,
        setTweet: setTweet,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
      }}
    >
      <Router>
        <Nav />
        <Route path="/" exact={true} component={Home} />
        <Route path="/profile" component={Profile} />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
