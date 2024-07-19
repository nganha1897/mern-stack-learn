
import * as actionTypes from "../actionTypes";

let initialState = {
  hospitals : []
}

//action => type and payload

let hospitalReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_ALL_HOSPITALS:
      return {...state, hospitals : action.payload}
    default:
      return state//if no action type matched return default state   
  }
}

export default hospitalReducer;