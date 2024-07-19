
import * as actionTypes from "../actionTypes";

let initialState = {
  user : {}
}

//action => type and payload

let userReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_USER_TO_STORE:
      return {...state, user : action.payload}; //new state dispatched to store
    default:
      return state//if no action type matched return default state   
  }
}

export default userReducer;