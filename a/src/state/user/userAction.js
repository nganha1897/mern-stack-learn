//action - is an object with 2 properties - type and payload
import * as actionTypes from "../actionTypes";
import axios from "axios";

export const AddUserToStore = (user) => {
  return {
    type: actionTypes.ADD_USER_TO_STORE, //actiontype to be matched in user reducer
    payload: user, //payload which will update the user state
  };
};

export const signup = (newUser) => {
  return (dispatch) => {
    axios
      .post(
        "http://localhost:9000/user/api/signup", //uri or endpoint of signinup api
        newUser //the user state object we dispatch from user component
      )
      .then((collection) => {
        let loggedUserData = collection.data;
        console.log("userdata: " + loggedUserData);
        dispatch(AddUserToStore(loggedUserData.user));
      })
      .catch((err) => {
        console.log("Error while signing up!", err);
      });
  };
};

export const signin = (username, password) => {
  return (dispatch) => {
    axios
      .post(
        "http://localhost:9000/user/api/signin", //uri or endpoint of signinup api
        { username, password }, //the user state object we dispatch from user component
        { withCredentials: true }
      )
      .then((response) => {
        let loggedUserData = response.data;
        console.log("userdata: " + loggedUserData);
        dispatch(AddUserToStore(loggedUserData.user));
      })
      .catch((err) => {
        console.log("Error while signing in!", err);
      });
  };
};

export const getProfile = (accessToken) => {
  return (dispatch) => {
    axios
      .get("http://localhost:9000/user/api/profile", { withCredentials: true })
      .then((response) => {
        dispatch(AddUserToStore(response.data.user));
      })
      .catch((err) => {
        console.log("Error while fetching profile!", err);
      });
  };
};
