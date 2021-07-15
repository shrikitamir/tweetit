import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppContext from "./context/AppContext";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const [currentPage, setCurrentPage] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [profile, setProfile] = useState("");
  const [tweetsArr, setTweetsArr] = useState([1]);
  const [tweet, setTweet] = useState({
    content: "",
    userName: "",
    date: new Date().toTimeString(),
  });

  return (
    <>
      <AuthProvider>
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
            <PrivateRoute path="/" exact={true} component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Router>
        </AppContext.Provider>
      </AuthProvider>
    </>
  );
}

export default App;
