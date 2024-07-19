
import * as actionTypes from "../actionTypes";

let initialState = {
  vaccines : []
}

//action => type and payload

let vaccineReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_VACCINE_TO_STORE:
      return {...state, vaccines : [...state.vaccines, action.payload]}; //new state dispatched to store
  
    case actionTypes.ADD_ALL_VACCINES:
      return {...state, vaccines : action.payload}
    default:
      return state//if no action type matched return default state   
  }
}

export default vaccineReducer;