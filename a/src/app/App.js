import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./common/Header";
import { useDispatch, useSelector } from 'react-redux';
import SignIn from "./user/SignIn";
import { getProfile } from "../state/user/userAction";

function App() {
  const user = useSelector((store) => store.userReducer.user);
  const username = user.username != undefined ? user.username : "Guest";
  console.log("username" + username)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <Router>
      <Header username={username} />
      <Routes>
        <Route path="user" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
