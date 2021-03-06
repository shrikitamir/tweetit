import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppContext from "./context/AppContext";
import { AuthProvider } from "./context/Auth";
import PrivateRoute from "./PrivateRoute";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const App = () => {
  const [nickName, setNickName] = useState("");
  const [userId, setUserId] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState(undefined);
  const [currentPage, setCurrentPage] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [tweetsArr, setTweetsArr] = useState([1]);
  const [tweet, setTweet] = useState({
    content: "",
  });

  return (
    <>
      <AuthProvider>
        <AppContext.Provider
          value={{
            nickName: nickName,
            setNickName: setNickName,
            userId: userId,
            setUserId: setUserId,
            loadingUpload: loadingUpload,
            setLoadingUpload: setLoadingUpload,
            userName: userName,
            setUserName: setUserName,
            image: image,
            setImage: setImage,
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
};

export default App;
