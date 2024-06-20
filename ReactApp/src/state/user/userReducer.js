
import * as actionTypes from "../actionTypes";

let initialState = {
  user : {
    userName : "Ha",
    password : "Ha",
    street : "New York",
    mobile : 123456789
  }
}

//action => type and payload

let userReducer = (state = initialState, action) => {
  
  console.log("User Actions ", action)

  switch(action.type) {
    case actionTypes.ADD_USER_TO_STORE:
      //...state is extracting all the state present in store
      //action.payload is the new user data that we need to add to store
      //User: action.payload - new payload is assigned to user
      return {...state, user : action.payload}; //new state dispatched to store
    default:
      return state//if no action type matched return default state   
  }
}

export default userReducer;