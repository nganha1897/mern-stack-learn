//action - is an object with 2 properties - type and payload
import * as actionTypes from "../actionTypes";
import axios from "axios";

export const AddStudentToStore = (student) => {
  return {
    type : actionTypes.ADD_STUDENT_TO_STORE, 
    payload : student
  }
}

export const SaveStudentToDB = (newStudent) => {
  return (dispatch) => {
    axios.post("http://localhost:9000/student/api/signinup",  //uri or endpoint of signinup api
    newStudent //the user state object we dispatch from user component
    ).then((collection) => {
      let loggedStudent = collection.data
      console.log(loggedStudent)
      dispatch(AddStudentToStore(loggedStudent))
    }).catch((err) => {
      console.log("error while loggin in", err)
    })
  }
}      