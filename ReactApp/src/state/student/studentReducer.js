
import * as actionTypes from "../actionTypes";

let initialState = {
  student : {
    studentName : "Dummy",
    age : 1,
    address : "some where on Earth"
  }
}

//action => type and payload

let studentReducer = (state = initialState, action) => {
  
  console.log("Student Actions ", action)

  switch(action.type) {
    case actionTypes.ADD_STUDENT_TO_STORE:
      return {...state, student : action.payload}; //new state dispatched to store
    default:
      return state//if no action type matched return default state   
  }
}

export default studentReducer;