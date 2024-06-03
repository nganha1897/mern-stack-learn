//create the connect method and add that to the component
//react-redux 
import React, { Component } from "react";
import { connect } from "react-redux";
import { AddStudentToStore, SaveStudentToDB } from "../../../state/student/studentAction.js";
import StudentComponent from "./StudentComponent.jsx";
//import AdminComponent from "./AdminComponent.jsx";

let globalCondition = "If we need to show admin login"

let mapStateToProps = (store) => { 
  return {
      student : store.studentReducer.student
  }
}

//mapDispatchToProps -- allows us to send data back to store to update in reducer
let mapDispatchToProps = (dispatch)=>{
  return {
      addStudent : (student)=>{
        dispatch(AddStudentToStore(student))
      },
      loginStudent : (student) => {
        dispatch(SaveStudentToDB(student))
      }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentComponent)