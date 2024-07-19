//store is a redux object which helps us handle state changes

//reducer - a function which works as switch case for each action type and updates state
//for every change returns new state
//each component will have its respective reducer

//action - the object a reducer accepts to create a new state
//action - the object which contains action type (ex: increment), payload (+5)

import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";

//we can add multiple reducers and combine them together to have 1 root reducer and add it to store
let rootReducer = combineReducers({
    userReducer
})

export default configureStore(
  {reducer : rootReducer},
  {}  //intial state if we want to set from store instead of reducer
)

