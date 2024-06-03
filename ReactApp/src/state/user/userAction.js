//action - is an object with 2 properties - type and payload
import * as actionTypes from "../actionTypes";
import axios from "axios";

export const AddUserToStore = (user) => {
  return {
    type : actionTypes.ADD_USER_TO_STORE, //actiontype to be matched in user reducer
    payload : user //payload which will update the user state
  }
}

//server call
//to save user to mongodb and do sign-in or sign-up
export const SaveUserToDB = (newUser) => {
  return (dispatch) => {
    axios.post("http://localhost:9000/user/api/signinup",  //uri or endpoint of signinup api
      newUser //the user state object we dispatch from user component
    ).then((collection) => {
      let loggedUser = collection.data
      console.log(loggedUser)
      dispatch(AddUserToStore(loggedUser))
    }).catch((err) => {
      console.log("error while loggin in", err)
    })
  }
}

export const SaveUserToDBUsingFetch = (newUser) => {
  return (dispatch) => {
    window.fetch("http://localhost:9000/user/api/signinup", 
    {
      method : "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    .then((response) => response.json())
    .then((userData) => {
      console.log(userData)
      dispatch(AddUserToStore(userData))
    }).catch((err) => {
      console.log("error while loggin in", err)
    })
  }
}       